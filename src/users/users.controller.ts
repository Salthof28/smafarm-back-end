import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Request, InternalServerErrorException } from '@nestjs/common';
import { UsersServiceItf } from './users.service.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Users } from '@prisma/client';
import { CustomExceptionGen } from 'src/global/exception/exception.general';

@Controller('users')
export class UsersController {
  constructor(@Inject('UsersServiceItf') private readonly usersService: UsersServiceItf) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profileUser(@Request() request): Promise<Users> {
    try {
      const profileUser = await this.usersService.getProfile(request.user.id);
      return profileUser;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }
}
