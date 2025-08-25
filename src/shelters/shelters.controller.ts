import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Query, ParseIntPipe, InternalServerErrorException, Request, UseGuards } from '@nestjs/common';
import { SheltersServiceItf } from './shelters.service.interface';
import { CareGive, Shelter } from '@prisma/client';
import { CustomExceptionGen } from '../global/exception/exception.general';
import { CreateShelterDto } from './dto/req/create-shelter.dto';
import { UpdateShelterDto } from './dto/req/update-shelter.dto';
import { CreateCareDto } from './dto/req/create-care.dto';
import { UpdateCareDto } from './dto/req/update-care.dto';
import { RolesGuard } from '../global/guards/roles.guard';
import { Roles } from '../global/decorator/roles.decorator';
import { Role } from '../global/enum/role.enum';
import { JwtAuthGuard } from '../global/guards/jwt-auth.guard';
import { TransformRes } from '../global/interceptors/transform-body-res.interceptor';
import { ShelterBodyDto } from './dto/res/shelter-body.dto';
import { CareBodyDto } from './dto/res/care-body.dto';
import { AllUpdateFeatShelterDto } from './dto/req/update-feat-shelter.dto';

@Controller('shelters')
export class SheltersController {
  constructor(@Inject('SheltersServiceItf') private readonly sheltersService: SheltersServiceItf){}

  @Get()
  @TransformRes(ShelterBodyDto)
  async getAllShelters(@Query('name') name?: string, @Query('location') location?: string, @Query('category_id') category_id?: number, @Query('low_price') low_price?: number, @Query('high_price') high_price?: number, @Query('farm_id') farm_id?: number): Promise<Shelter[]> {
    try {
      const allShelters: Shelter[] = await this.sheltersService.getAllShelters({
        name,
        location,
        category_id,
        low_price,
        high_price,
        farm_id
      });
      return allShelters;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  };

  @UseGuards(RolesGuard)
  @Roles(Role.BREEDER)
  @UseGuards(JwtAuthGuard)
  @Post()
  @TransformRes(ShelterBodyDto)
  async createdShelter(@Request() request, @Body() body: CreateShelterDto): Promise<Shelter> {
    try {
      const user_id = request.user.id;
      const newShelter: Shelter = await this.sheltersService.createdShelter({
        user_id,
        body
      });
      return newShelter;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }       
  };

  @Get('cares')
  @TransformRes(CareBodyDto)
  async getAllCares(): Promise<CareGive[]> {
    try {
      const allCare: CareGive[] = await this.sheltersService.getAllCares()
      return allCare;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }   
  }

  @UseGuards(RolesGuard)
  @Roles(Role.BREEDER)
  @UseGuards(JwtAuthGuard)
  @Post('cares')
  @TransformRes(CareBodyDto)
  async createCare(@Request() request, @Body() body: CreateCareDto): Promise<CareGive> {
    try {
      const user_id = request.user.id;
      const newCare: CareGive = await this.sheltersService.createdCare({
        user_id,
        body
      });
      return newCare;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }      
  };

  @UseGuards(RolesGuard)
  @Roles(Role.BREEDER)
  @UseGuards(JwtAuthGuard)
  @Patch('cares/:id')
  @TransformRes(CareBodyDto)
  async updatedCare(@Request() request, @Param('id', ParseIntPipe) id: number, @Body() body: UpdateCareDto): Promise<CareGive> {
    try {
      const user_id = request.user.id;
      const upCare: CareGive = await this.sheltersService.updatedCare({
        id,
        user_id,
        body
      });
      return upCare;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }      
  };

  @UseGuards(RolesGuard)
  @Roles(Role.BREEDER)
  @UseGuards(JwtAuthGuard)
  @Delete('cares/:id')
  @TransformRes(CareBodyDto)
  async deletedCare(@Request() request, @Param('id', ParseIntPipe) id: number): Promise<CareGive> {
    try {
      const user_id = request.user.id;
      const deleteCare: CareGive = await this.sheltersService.deletedCare({
        user_id,
        id
      });
      return deleteCare;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    } 
  }

  @Get(':id')
  @TransformRes(ShelterBodyDto)
  async getShelter(@Param('id', ParseIntPipe) id: number): Promise<Shelter> {
    try {
      const shelter: Shelter = await this.sheltersService.getShelter(id);
      return shelter;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }    
  };

  @UseGuards(RolesGuard)
  @Roles(Role.BREEDER)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @TransformRes(ShelterBodyDto)
  async updateShelter(@Request() request, @Param('id', ParseIntPipe) id: number, @Body() body: AllUpdateFeatShelterDto) {
    try {
      const user_id = request.user.id;
      const updateShelter = await this.sheltersService.updateShelterPros({
        user_id,
        shelter_id: id,
        shelter: body.shelter,
        uploadImage: body.uploadImage,
        deleteImage: body.deleteImage,
        newCare: body.newCare,
        updateCare: body.updateCare,
        deleteCare: body.deleteCare
      });
      return updateShelter
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }  
  };

  @UseGuards(RolesGuard)
  @Roles(Role.BREEDER)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @TransformRes(ShelterBodyDto)
  async deletedShelter(@Request() request, @Param('id', ParseIntPipe) id: number): Promise<Shelter> {
    try {
      const user_id = request.user.id;
      const deleteShelter: Shelter = await this.sheltersService.deletedShelter({
        user_id,
        id
      });
      return deleteShelter;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    } 
  }
}
