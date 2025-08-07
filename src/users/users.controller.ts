import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, UseGuards, Request, InternalServerErrorException, ParseIntPipe } from '@nestjs/common';
import { UsersServiceItf } from './users.service.interface';
import { JwtAuthGuard } from 'src/global/guards/jwt-auth.guard';
import { Users } from '@prisma/client';
import { CustomExceptionGen } from 'src/global/exception/exception.general';
import { Role } from 'src/global/enum/role.enum';
import { Roles } from 'src/global/decorator/roles.decorator';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { RolesGuard } from 'src/global/guards/roles.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(@Inject('UsersServiceItf') private readonly usersService: UsersServiceItf) {}

  // async getAllAccounts(@Query('account_name') account_name?: string, @Query('account_number') account_number?: string, @Query('branch_code') branch_code?: string) {}

  @Get('profile')
  async profileUser(@Request() request): Promise<Users> {
    try {
      const profileUser = await this.usersService.getProfile(request.user.id);
      return profileUser;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  };

  @Patch('profile')
  async updateProfile(@Request() request, @Body() body: UpdateUserDto & { oldPassword?: string }): Promise<Users> {
    try {
      const updateUser: Users = await this.usersService.updateProfile({
        id: request.user.id,
        body,
        oldPassword: body.oldPassword
      });
      return updateUser;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  async getUserByAdmin(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    try {
      const user: Users = await this.usersService.findUserByAdmin(id);
      return user;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Patch(':id')
  async updateUserByAdmin(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto): Promise<Users> {
    try {
      const updatedUser: Users = await this.usersService.updateUserByAdmin({
        id,
        body
      });
      return updatedUser;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  
}
