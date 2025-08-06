import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthServiceItf, DataReq } from './auth.service.interface';
import { UsersRepositoryItf } from '../users/users.repository.interface';
import { CreateUserDto } from '../users/dto/req/create-user.dto';
import { Condition } from '../global/entities/condition-entity';
import { SessionLogin, Users } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { EmailRegisteredException } from './exception/email-registered-exception';
import { PhoneRegisteredException } from './exception/phone-registered-exception';
import { LoginUserDto } from './dto/login.dto';
import { InvalidLoginException } from './exception/invalid-login-exception';
import { JwtService } from '@nestjs/jwt';
import { TokenException } from './exception/token-exception';
import { UserNotFoundException } from 'src/users/exception/user-not-found-exception';

@Injectable()
export class AuthService implements AuthServiceItf {
  constructor(@Inject('UsersRepositoryItf') private usersRepository: UsersRepositoryItf, private jwtService: JwtService) {}

  async register(body: CreateUserDto): Promise<Users> {
    const condition: Condition[] = [
      {email: body.email},
      {phone: body.phone}
    ];
    const exisUser: Users | undefined = await this.usersRepository.findExistingUser(condition);
    // console.log(exisUser)
    if(exisUser) {
      if(exisUser.email === body.email) throw new EmailRegisteredException();
      if(exisUser.phone === body.phone) throw new PhoneRegisteredException();
    }
    const salt = 10;
    body.password = await bcrypt.hash(body.password, salt);
    const createUser: Users = await this.usersRepository.created(body);
    return createUser;
  }

  async login(body: LoginUserDto, dataReq: DataReq): Promise<{ access_token: string, refresh_token: string }> {
    const user: Users | undefined = await this.usersRepository.findEmail(body.email);
    if(!user) throw new InvalidLoginException();
    // compare password
    const isMatchPassword = await bcrypt.compare(body.password, user.password);
    if(!isMatchPassword) throw new InvalidLoginException();
    // create access token
    const accessPayload = { sub: user.id, name: user.name, role: user.role, expires_at: new Date(Date.now() + 60 * 60 * 1000) }
    const accessToken = await this.jwtService.signAsync(accessPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h'
    });
    // create refresh token
    const refreshPayload = { sub: user.id };
    const refreshToken = await this.jwtService.signAsync(refreshPayload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d'
    });
    // hashing refresh token
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    // create session
    await this.usersRepository.loginSession({
      user_id: user.id,
      refreshToken: hashedRefreshToken,
      userAgent: dataReq.userAgent,
      ipAddress: dataReq.ipAddress,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    })
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  async refreshToken(user_id: number, oldRefreshToken: string): Promise<{ access_token: string; refresh_token: string; }> {
    const user = await this.usersRepository.findById(user_id);
    if(!user) throw new UserNotFoundException('user not found based on sub from refresh token')
    const session = user?.sessions;
    if(session.length < 1) throw new TokenException('refresh token not found in session db');
    // check valid refresh token
    let validSession: SessionLogin | undefined;
    for (const s of session) {
      const isMatch = await bcrypt.compare(oldRefreshToken, s.refreshToken);
      if (isMatch) {
        validSession = s;
        break;
      }
    }
    if(!validSession) throw new TokenException();
    // check refresh token expired
    if(Date.now() > validSession.expires_at.getTime()) {
      await this.usersRepository.deleteSession(validSession.id);
      throw new TokenException('refresh token not found because expired')
    }
    // create new access token
    const newAccessPayload = { sub: user.id, name: user.name, role: user.role, expires_at: new Date(Date.now() + 60 * 60 * 1000) }
    const newAccessToken = await this.jwtService.signAsync(newAccessPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '1h'
    });
    // create new refresh token
    const newRefreshPayload = { sub: user.id };
    const newRefreshToken = await this.jwtService.signAsync(newRefreshPayload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '30d'
    });
    const hashedRefreshToken = await bcrypt.hash(newRefreshToken, 10);
    // update session
    await this.usersRepository.updateRefreshToken({
      id: validSession.id,
      refreshToken: hashedRefreshToken,
      expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    });
    return { access_token: newAccessToken, refresh_token: newRefreshToken };
  }
}
