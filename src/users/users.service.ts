import { Inject, Injectable } from '@nestjs/common';
import { UsersRepositoryItf } from './users.repository.interface';
import { UsersServiceItf } from './users.service.interface';
import { Users } from '@prisma/client';
import { UserNotFoundException } from './exception/user-not-found-exception';

@Injectable()
export class UsersService implements UsersServiceItf {
  constructor(@Inject('UsersRepositoryItf') private usersRepository: UsersRepositoryItf) {}

  async getProfile(id: number): Promise<Users> {
    const userProfile: Users | undefined = await this.usersRepository.findById(id);
    if(!userProfile) throw new UserNotFoundException();
    return userProfile;
  }

}
