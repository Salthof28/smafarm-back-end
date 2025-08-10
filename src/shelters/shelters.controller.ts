import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { SheltersServiceItf } from './shelters.service.interface';

@Controller('shelters')
export class SheltersController {
  constructor(@Inject('SheltersServiceItf') private readonly sheltersService: SheltersServiceItf){}
}
