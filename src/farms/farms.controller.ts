import { Body, Controller, Delete, Get, Inject, InternalServerErrorException, Param, ParseIntPipe, Patch, Post, Query, Request, UseGuards } from '@nestjs/common';
import { FarmsServiceItf } from './farms.service.interface';
import { Farms } from '@prisma/client';
import { CustomExceptionGen } from '../global/exception/exception.general';
import { CreateFarmDto } from './dto/req/create-farm.dto';
import { UpdateFarmDto } from './dto/req/update-farm.dto';
import { JwtAuthGuard } from '../global/guards/jwt-auth.guard';
import { TransformRes } from '../global/interceptors/transform-body-res.interceptor';
import { FarmBodyDto } from './dto/res/farm-body.dto';
import { Roles } from '../global/decorator/roles.decorator';
import { Role } from '../global/enum/role.enum';
import { RolesGuard } from '../global/guards/roles.guard';

@Controller('farms')
@TransformRes(FarmBodyDto)
export class FarmsController {
  constructor(@Inject('FarmsServiceItf') private readonly farmsService: FarmsServiceItf) {}

  @Get()
  async getAllFarms(@Query('name') name?: string, @Query('location') location?: string, @Query('rating') rating?: number): Promise<Farms[]> {
    try {
      const allFarms: Farms[] = await this.farmsService.getAllFarms({
        name,
        location,
        rating,
      });
      return allFarms;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  };

  @UseGuards(RolesGuard)
  @Roles(Role.BREEDER)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createdFarm(@Request() request, @Body() body: CreateFarmDto): Promise<Farms> {
    try {
      const user_id = request.user.id;
      const createFarms: Farms = await this.farmsService.createdFarm({
        user_id,
        body,
      });
      return createFarms;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  };

  @UseGuards(RolesGuard)
  @Roles(Role.BREEDER)
  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updatedFarm(@Request() request, @Body() body: UpdateFarmDto): Promise<Farms> {
    try {
      const id = request.user.id;
      const updateFarm: Farms = await this.farmsService.updatedFarm({
        id,
        body
      });
      return updateFarm;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  };

  @Get(':id')
  async getFarm(@Param('id', ParseIntPipe) id: number): Promise<Farms> {
    try {
      const farm: Farms = await this.farmsService.getFarm(id);
      return farm;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  };

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updatedFarmByAdmin(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateFarmDto): Promise<Farms> {
    try {
      const updateFarm: Farms = await this.farmsService.updatedFarmByAdmin({
        id,
        body
      });
      return updateFarm;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  };

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletedFarm(@Param('id', ParseIntPipe) id: number): Promise<Farms> {
    try {
      const deleteFarm: Farms = await this.farmsService.deletedFarm(id);
      return deleteFarm;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  };

  @Get('shelter/:id')
  async getSheltersfarm(@Param('id', ParseIntPipe) id: number): Promise<Farms> {
    try {
      const farm: Farms = await this.farmsService.getSheltersFarm(id);
      return farm;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }
}
