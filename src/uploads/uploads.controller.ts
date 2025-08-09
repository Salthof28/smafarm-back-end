import { Controller, Post, Body, Delete, Inject, Request, UploadedFile, InternalServerErrorException, UseGuards, UseInterceptors, HttpCode, HttpStatus } from '@nestjs/common';
import { UploadsServiceItf } from './uploads.service.interface';
import { CustomExceptionGen } from '../global/exception/exception.general';
import { JwtAuthGuard } from '../global/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { DeleteUrlDto } from './dto/req/delete-url.dto';
import { TransformRes } from '../global/interceptors/transform-body-res.interceptor';
import { UrlBodyDto } from './dto/res/url-body.dto';

@UseGuards(JwtAuthGuard)
@UseInterceptors(FileInterceptor('file'))
@Controller('uploads')
export class UploadsController {
  constructor(@Inject('UploadsServiceItf') private readonly uploadsService: UploadsServiceItf) {}
  
  @Post('profile')
  @TransformRes(UrlBodyDto)
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
  @TransformRes(UrlBodyDto)
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

  @Delete('/shelter/deleted')
  async deleteImgShelter(@Body() body: DeleteUrlDto): Promise<{ message: string, url: string }> {
    try{
      const deleteImg = await this.uploadsService.deleteImgShelter(body.url);
      return deleteImg
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }
}
