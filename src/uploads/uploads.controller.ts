import { Controller, Post, Body, Delete, Inject, Request, UploadedFile, InternalServerErrorException, UseGuards, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UploadsServiceItf } from './uploads.service.interface';
import { CustomExceptionGen } from '../global/exception/exception.general';
import { JwtAuthGuard } from '../global/guards/jwt-auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { DeleteUrlDto } from './dto/req/delete-url.dto';
import { TransformRes } from '../global/interceptors/transform-body-res.interceptor';
import { UrlBodyDto } from './dto/res/url-body.dto';
import { IdUploadDto } from './dto/req/id-upload.dto';

@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(@Inject('UploadsServiceItf') private readonly uploadsService: UploadsServiceItf) {}
  @UseInterceptors(FileInterceptor('file'))
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
  };

  @UseInterceptors(FileInterceptor('file'))
  @Post('farm')
  @TransformRes(UrlBodyDto)
  async uploadImgfarm(@Request() request, @UploadedFile() file: Express.Multer.File): Promise<{ url: string }> {
    try{
      const upload = await this.uploadsService.uploadImgFarmProfile({
        userId: request.user.id,
        file,
      });
      return upload;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  };


  @UseInterceptors(FilesInterceptor('files'))
  @Post('shelter')
  @TransformRes(UrlBodyDto)
  async uploadImgShelter(@Request() request, @UploadedFiles() files: Express.Multer.File[], @Body() body: IdUploadDto): Promise<{ url: string[] }> {
    try{
      const upload = await this.uploadsService.uploadImgShelter({
        userId: request.user.id,
        shelterId: body.id,
        files,
      });
      return upload;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  @Delete('/shelter/deleted')
  async deleteImgShelter(@Request() request, @Body() body: DeleteUrlDto): Promise<{ message: string, url: string[] }> {
    try{
      const deleteImg = await this.uploadsService.deleteImgShelter({
        userId: request.user.id,
        shelterId: body.id,
        url: body.url
      });
      return deleteImg
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  @Post('livestock')
  @TransformRes(UrlBodyDto)
  async uploadImgLivestock(@Request() request, @UploadedFile() file: Express.Multer.File, @Body() body: IdUploadDto): Promise<{ url: string }> {
    try{
      const upload = await this.uploadsService.uploadImgLivestock({
        userId: request.user.id,
        livestockId: body.id,
        file,
      });
      return upload;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  // @Delete('/livestock/deleted')
  // async deleteImgLivestock(@Request() request, @Body() body: DeleteUrlDto): Promise<{ message: string, url: string }> {
  //   try{
  //     const deleteImg = await this.uploadsService.deleteImgLivestock({
  //       userId: request.user.id,
  //       livestockId: body.id,
  //       url: body.url
  //     });
  //     return deleteImg
  //   } catch (error) {
  //     if(error instanceof CustomExceptionGen) throw error;
  //     throw new InternalServerErrorException()
  //   }
  // }
}
