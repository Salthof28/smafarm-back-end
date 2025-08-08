import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { UploadsServiceItf } from './uploads.service.interface';

@Controller('uploads')
export class UploadsController {
  constructor(@Inject('UploadsServiceItf') private readonly uploadsService: UploadsServiceItf) {}

}
