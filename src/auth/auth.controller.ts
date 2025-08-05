import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, InternalServerErrorException } from '@nestjs/common';
import { AuthServiceItf } from './auth.service.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Users } from '@prisma/client';
import { CustomExceptionGen } from '../global/exception/exception.general';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AuthServiceItf') private readonly authService: AuthServiceItf) {}

  @Post('register')
  async registerUser(@Body() body: CreateUserDto): Promise<Users> {
    try {
      const newUser= await this.authService.register(body);
      return newUser;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

}
