import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, Request, UploadedFile, InternalServerErrorException, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadsServiceItf } from './uploads.service.interface';
import { CustomExceptionGen } from 'src/global/exception/exception.general';
import { JwtAuthGuard } from 'src/global/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteUrlDto } from './dto/req/delete-url.dto';

@UseGuards(JwtAuthGuard)
@UseInterceptors(FileInterceptor('file'))
@Controller('uploads')
export class UploadsController {
  constructor(@Inject('UploadsServiceItf') private readonly uploadsService: UploadsServiceItf) {}
  
  @Post('profile')
  async uploadPhotoProfile(@Request() request, @UploadedFile() file: Express.Multer.File): Promise<{ url: string }> {
    try{
      const upload = await this.uploadsService.uploadImgProfile({
        userId: request.user.id,
        file,
      });
      return upload;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  @Post('shelter')
  async uploadImgShelter(@Request() request, @UploadedFile() file: Express.Multer.File): Promise<{ url: string }> {
    try{
      const upload = await this.uploadsService.uploadImgShelter({
        userId: request.user.id,
        file,
      });
      return upload;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  @Post('/shelter/deleted')
  async deleteImgShelter(@Body() body: DeleteUrlDto) {
    try{
      const deleteImg = await this.uploadsService.deleteImgShelter(body.url);
      return deleteImg
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }
}
