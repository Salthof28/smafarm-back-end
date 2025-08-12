import { Inject, Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { DelImagesBucketLivestock, DelImagesBucketShelter, ImagesUploadLivestock, ImagesUploadShelter, ImageUpload, UploadsServiceItf } from './uploads.service.interface';
import * as path from 'path';
import { FileNotFoundException } from './exceptions/file-not-found-exception';
import { UploadException } from './exceptions/upload-exception';
import { BucketNameException } from './exceptions/bucket-name-exception';
import { SheltersRepositoryItf } from '../shelters/shelters.repository.interface';
import { ShelterAccessException } from '../shelters/exception/shelter-access-exception';
import { ShelterNotFoundException } from '../shelters/exception/shelter-not-found-exception';
import { LivestocksRepositoryItf, OutRelationLivestock } from '../livestocks/livestocks.repository.interface';

@Injectable()
export class UploadsService implements UploadsServiceItf {
  private supabase;

  constructor(@Inject('SheltersRepositoryItf') private readonly sheltersRepository: SheltersRepositoryItf, @Inject('LivestocksRepositoryItf') private readonly livestocksRepository: LivestocksRepositoryItf) {
    this.supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY,
    );
  }

  async uploadImgProfile(upload: ImageUpload): Promise<{ url: string }> {
    if(!upload.file) throw new FileNotFoundException();
    // name file and path
    const fileName = 'profile.jpg';
    const filePath = `users/${upload.userId}/${fileName}`;
    // upload process
    const { error: uploadError } = await this.supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(filePath, upload.file.buffer, {
        contentType: upload.file.mimetype,
        upsert: true
      });
    
    if(uploadError) throw new UploadException(uploadError.message);

    const { data: publicUrlData } = this.supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(filePath);
    
    const publicUrl = publicUrlData.publicUrl;
    return { url: publicUrl };
  }

  async uploadImgShelter(upload: ImagesUploadShelter): Promise<{ url: string; }> {
    if(!upload.file) throw new FileNotFoundException();
    // check user is owner the shelter
    const checkShelter: { farm: { user_id: number } } | undefined = await this.sheltersRepository.getRelationShelter(upload.shelterId);
    if(!checkShelter) throw new ShelterNotFoundException();
    if(checkShelter.farm.user_id !== upload.userId) throw new ShelterAccessException();
    // name file and path
    const originalName = upload.file.originalname;
    const fileName = `${Date.now()}-${path.parse(originalName).name}.jpg`;
    const filePath = `shelters/${upload.shelterId}/${fileName}`;
    // upload process
    const { error: uploadError } = await this.supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(filePath, upload.file.buffer, {
        contentType: upload.file.mimetype,
        upsert: true
      });
    
    if(uploadError) throw new UploadException(uploadError.message);

    const { data: publicUrlData } = this.supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(filePath);
    
    const publicUrl = publicUrlData.publicUrl;
    return { url: publicUrl };
  }

  async deleteImgShelter(deleteImg: DelImagesBucketShelter): Promise<{ message: string, url: string }> {
    // check user is owner the shelter
    const checkShelter: { farm: { user_id: number } } | undefined = await this.sheltersRepository.getRelationShelter(deleteImg.shelterId);
    if(!checkShelter) throw new ShelterNotFoundException();
    if(checkShelter.farm.user_id !== deleteImg.userId) throw new ShelterAccessException();
    // name bucket
    const bucketName = "smafarm"
    // get pathname url, example -> "/storage/v1/object/public/smafarm/shelters/123/abc.jpg"
    const parseUrl = new URL(deleteImg.url);
    // split url become array string, example -> ["", "storage", "v1", "object", "public", "smafarm", "shelters", "123", "abc.jpg"]
    const  partsUrl = parseUrl.pathname.split('/');
    // search position index by bucketName
    const bucketIndex = partsUrl.indexOf(bucketName);
    // if not find bucket throw exception
    if(bucketIndex === -1) throw new BucketNameException();
    // get all path after bucketName, example -> ["shelters", "123", "abc.jpg"]
    const rawPath = partsUrl.slice(bucketIndex + 1);
    // decode raw path for convert special character like spaces
    const decodedPath = rawPath.map(path => decodeURIComponent(path));
    // combine raw path with slice for path
    const filePath = decodedPath.join('/');
    await this.supabase.storage.from(process.env.SUPABASE_BUCKET).remove([filePath]);
    return { message: 'success deleted', url: deleteImg.url }
  }

  async uploadImgLivestock(upload: ImagesUploadLivestock): Promise<{ url: string; }> {
    if(!upload.file) throw new FileNotFoundException();
    // check user is owner the shelter
    const checkLivestock: OutRelationLivestock | undefined = await this.livestocksRepository.getRelationLivestock(upload.livestockId);
    if(!checkLivestock) throw new ShelterNotFoundException();
    if(checkLivestock.farm.user_id !== upload.userId) throw new ShelterAccessException();
    // name file and path
    const originalName = upload.file.originalname;
    const fileName = `${Date.now()}-${path.parse(originalName).name}.jpg`;
    const filePath = `livestocks/${upload.livestockId}/${fileName}`;
    // upload process
    const { error: uploadError } = await this.supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .upload(filePath, upload.file.buffer, {
        contentType: upload.file.mimetype,
        upsert: true
      });
    
    if(uploadError) throw new UploadException(uploadError.message);

    const { data: publicUrlData } = this.supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .getPublicUrl(filePath);
    
    const publicUrl = publicUrlData.publicUrl;
    return { url: publicUrl };
  }

  async deleteImgLivestock(deleteImg: DelImagesBucketLivestock): Promise<{ message: string; url: string; }> {
    // check user is owner the shelter
    const checkLivestock: OutRelationLivestock | undefined = await this.livestocksRepository.getRelationLivestock(deleteImg.livestockId);
    if(!checkLivestock) throw new ShelterNotFoundException();
    if(checkLivestock.farm.user_id !== deleteImg.userId) throw new ShelterAccessException();
    // name bucket
    const bucketName = "smafarm"
    // get pathname url, example -> "/storage/v1/object/public/smafarm/shelters/123/abc.jpg"
    const parseUrl = new URL(deleteImg.url);
    // split url become array string, example -> ["", "storage", "v1", "object", "public", "smafarm", "shelters", "123", "abc.jpg"]
    const  partsUrl = parseUrl.pathname.split('/');
    // search position index by bucketName
    const bucketIndex = partsUrl.indexOf(bucketName);
    // if not find bucket throw exception
    if(bucketIndex === -1) throw new BucketNameException();
    // get all path after bucketName, example -> ["shelters", "123", "abc.jpg"]
    const rawPath = partsUrl.slice(bucketIndex + 1);
    // decode raw path for convert special character like spaces
    const decodedPath = rawPath.map(path => decodeURIComponent(path));
    // combine raw path with slice for path
    const filePath = decodedPath.join('/');
    await this.supabase.storage.from(process.env.SUPABASE_BUCKET).remove([filePath]);
    return { message: 'success deleted', url: deleteImg.url }    
  }

}
