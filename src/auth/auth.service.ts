import { Inject, Injectable } from '@nestjs/common';
import { AuthServiceItf } from './auth.service.interface';
import { UsersRepositoryItf } from '../users/users.repository.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Condition } from '../global/entities/condition-entity';
import { Users } from '@prisma/client';
import * as bcrypt from 'bcrypt'
import { EmailRegisteredException } from './exception/email-registered-exception';
import { PhoneRegisteredException } from './exception/phone-registered-exception';

@Injectable()
export class AuthService implements AuthServiceItf {
  constructor(@Inject('UsersRepositoryItf') private usersRepository: UsersRepositoryItf) {}

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
}
