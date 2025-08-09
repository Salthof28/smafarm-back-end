import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/req/create-farm.dto';
import { UpdateFarmDto } from './dto/req/update-farm.dto';
import { FarmsServiceItf } from './farms.service.interface';

@Controller('farms')
export class FarmsController {
  constructor(@Inject('FarmsServiceItf') private readonly farmsService: FarmsServiceItf) {}
  
}
