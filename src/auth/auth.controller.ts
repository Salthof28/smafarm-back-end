import { Controller, Post, Body, Inject, InternalServerErrorException, Request, Req, UseGuards, HttpCode, HttpStatus, Delete } from '@nestjs/common';
import { AuthServiceItf } from './auth.service.interface';
import { CreateUserDto } from '../users/dto/req/create-user.dto';
import { SessionLogin, Users } from '@prisma/client';
import { CustomExceptionGen } from '../global/exception/exception.general';
import { LoginUserDto } from './dto/req/login.dto';
import { JwtAuthGuard } from '../global/guards/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';
import { JwtRefreshGuard } from '../global/guards/jwt-refresh.guard';
import { TokenException } from './exception/token-exception';
import { TransformRes } from '../global/interceptors/transform-body-res.interceptor';
import { UserBodyDto } from '../users/dto/res/user-body.dto';
import { TokenBodyDto } from './dto/res/token-body.dto';
import { SessionBodyDto } from './dto/res/session-body.dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AuthServiceItf') private readonly authService: AuthServiceItf) {}

  @Post('register')
  @TransformRes(UserBodyDto)
  async registerUser(@Body() body: CreateUserDto): Promise<Users> {
    try {
      const newUser= await this.authService.register(body);
      return newUser;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @TransformRes(TokenBodyDto)
  async loginUser(@Body() body: LoginUserDto, @Req() req: ExpressRequest): Promise<{ access_token: string, refresh_token: string }> {
    try {
      const userAgent = req.headers['user-agent'] || 'unknown';
      const ipAddress = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown'
      const loginUser= await this.authService.login(body, {
        ipAddress,
        userAgent,
      });
      return loginUser;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refreshToken')
  @TransformRes(TokenBodyDto)
  async refreshToken(@Request() request, @Req() req: ExpressRequest): Promise<{ access_token: string, refresh_token: string }> {
    try {
      console.log(request.user)
      const authHeader = req.headers['authorization'];
      const refreshToken = typeof authHeader === 'string' ? authHeader.split(' ')[1] : undefined;
      if(!refreshToken) throw new TokenException('undefined value')
      const newAccess = await this.authService.refreshToken(
        request.user.id_token,
        request.user.tokenAccess,
        refreshToken
      );
      return newAccess
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  @TransformRes(SessionBodyDto)
  async logout(@Request() request): Promise<SessionLogin> {
    try {
      const logoutUser = await this.authService.logout(request.user.id_token);
      return logoutUser;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }
}
