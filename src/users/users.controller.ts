import { Controller, Get, Body, Patch, Param, Delete, Inject, UseGuards, Request, InternalServerErrorException, ParseIntPipe, Query } from '@nestjs/common';
import { UsersServiceItf } from './users.service.interface';
import { JwtAuthGuard } from '../global/guards/jwt-auth.guard';
import { Users } from '@prisma/client';
import { CustomExceptionGen } from '../global/exception/exception.general';
import { Role } from '../global/enum/role.enum';
import { Roles } from '../global/decorator/roles.decorator';
import { UpdateUserDto } from './dto/req/update-user.dto';
import { RolesGuard } from '../global/guards/roles.guard';
import { TransformRes } from '../global/interceptors/transform-body-res.interceptor';
import { UserBodyDto } from './dto/res/user-body.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
@TransformRes(UserBodyDto)
export class UsersController {
  constructor(@Inject('UsersServiceItf') private readonly usersService: UsersServiceItf) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getAllUsers(@Query('name') name?: string, @Query('email') email?: string, @Query('phone') phone?: string): Promise<Users[]> {
    try {
      const allUsers: Users[] = await this.usersService.getAllUsers({
        name,
        email,
        phone
      });
      return allUsers;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

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

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete(':id')
  async deletedUserByAdmin(@Param('id', ParseIntPipe) id: number): Promise<Users> {
    try {
      const deleteUser: Users = await this.usersService.deletUserByAdmin(id);
      return deleteUser;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

}
