import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { LivestocksService } from './livestocks.service';
import { CreateLivestockDto } from './dto/req/create-livestock.dto';
import { UpdateLivestockDto } from './dto/req/update-livestock.dto';
import { LivestocksServiceItf } from './livestocks.service.interface';

@Controller('livestocks')
export class LivestocksController {
  constructor(@Inject('LivestocksServiceItf') private readonly livestocksService: LivestocksServiceItf){}
  
}
