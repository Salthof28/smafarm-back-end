import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, InternalServerErrorException, ParseIntPipe, Request, UseGuards } from '@nestjs/common';
import { LivestocksServiceItf } from './livestocks.service.interface';
import { Livestock } from '@prisma/client';
import { CustomExceptionGen } from '../global/exception/exception.general';
import { TransformRes } from '../global/interceptors/transform-body-res.interceptor';
import { LivestockBodyDto } from './dto/res/livestock-body.dto';
import { CreateLivestockDto } from './dto/req/create-livestock.dto';
import { UpdateLivestockDto } from './dto/req/update-livestock.dto';
import { RolesGuard } from '../global/guards/roles.guard';
import { Roles } from '../global/decorator/roles.decorator';
import { Role } from '../global/enum/role.enum';
import { JwtAuthGuard } from '../global/guards/jwt-auth.guard';
import { AllUpdateFeatLivestockDto } from './dto/req/update-feat-livestock.dto';

@Controller('livestocks')
@TransformRes(LivestockBodyDto)
export class LivestocksController {
  constructor(@Inject('LivestocksServiceItf') private readonly livestocksService: LivestocksServiceItf){}
  
  @Get()
  async getAllLivestock(@Query('name') name?: string, @Query('location') location?: string, @Query('category_id') category_id?: number, @Query('low_price') low_price?: number, @Query('high_price') high_price?: number, @Query('farm_id') farm_id?: number): Promise<Livestock[]> {
    try {
      const allLivestock: Livestock[] = await this.livestocksService.getAllLivestock({
        name,
        location,
        category_id,
        low_price,
        high_price,
        farm_id
      });
      return allLivestock;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }    
  };

  @UseGuards(RolesGuard)
  @Roles(Role.BREEDER)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createdLivestock(@Request() request, @Body() body: CreateLivestockDto): Promise<Livestock> {
    try {
      const user_id = request.user.id;
      const newLivestock: Livestock = await this.livestocksService.createdLivestock({
        user_id,
        body
      });
      return newLivestock;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }   
  }

  @Get(':id')
  async getLivestock(@Param('id', ParseIntPipe) id: number): Promise<Livestock> {
    try {
      const livestock: Livestock = await this.livestocksService.getOneLivestock(id);
      return livestock;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }    
  };

  @UseGuards(RolesGuard)
  @Roles(Role.BREEDER)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updatedLivestock(@Request() request, @Param('id', ParseIntPipe) id: number, @Body() body: AllUpdateFeatLivestockDto): Promise<Livestock> {
    try {
      const user_id = request.user.id;
      const upLivestock: Livestock = await this.livestocksService.updateLivestockPros({
        user_id,
        livestock_id: id,
        livestock: body.livestock,
        uploadImage: body.uploadImage,
        deleteImage: body.deleteImage
      });
      return upLivestock;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }    
  };

  @UseGuards(RolesGuard)
  @Roles(Role.BREEDER)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletedLivestock(@Request() request, @Param('id', ParseIntPipe) id: number): Promise<Livestock> {
    try {
      const user_id = request.user.id;
      const deleteLivestock: Livestock = await this.livestocksService.deletedLivestock({
        user_id,
        id
      });
      return deleteLivestock;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }    
  }

}
