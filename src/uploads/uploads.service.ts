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
import { FarmsRepositoryItf } from '../farms/farms.repository.interface';
import { FarmNotFoundException } from '../farms/exception/farm-not-found-exception';
import { Farms } from '@prisma/client';

@Injectable()
export class UploadsService implements UploadsServiceItf {
  private supabase;

  constructor(@Inject('SheltersRepositoryItf') private readonly sheltersRepository: SheltersRepositoryItf, @Inject('LivestocksRepositoryItf') private readonly livestocksRepository: LivestocksRepositoryItf, @Inject('FarmsRepositoryItf') private readonly farmsRepository: FarmsRepositoryItf) {
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
  };

  async uploadImgFarmProfile(upload: ImageUpload): Promise<{ url: string; }> {
    if(!upload.file) throw new FileNotFoundException();
    const checkShelter: Farms | undefined = await this.farmsRepository.getFarmByUserId(upload.userId);
    if(!checkShelter) throw new FarmNotFoundException("you don't have farm");
    // name file and path
    const fileName = 'farm.jpg';
    const filePath = `farms/${checkShelter.id}/${fileName}`;
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

  async uploadImgShelter(upload: ImagesUploadShelter): Promise<{ url: string[]; }> {
    if (!upload.files || upload.files.length === 0) {
      throw new FileNotFoundException();
    }

    // Check user is owner of the shelter
    const checkShelter: { farm: { user_id: number } } | undefined = await this.sheltersRepository.getRelationShelter(upload.shelterId);
    if (!checkShelter) throw new ShelterNotFoundException();
    if (checkShelter.farm.user_id !== upload.userId)
      throw new ShelterAccessException();

    const uploadedUrls: string[] = [];

    for (const file of upload.files) {
      // Generate name and path
      const originalName = file.originalname;
      const fileName = `${Date.now()}-${path.parse(originalName).name}.jpg`;
      const filePath = `shelters/${upload.shelterId}/${fileName}`;

      // Upload to Supabase bucket
      const { error: uploadError } = await this.supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (uploadError) throw new UploadException(uploadError.message);

      // Get public URL
      const { data: publicUrlData } = this.supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .getPublicUrl(filePath);

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    return { url: uploadedUrls };
  }

  async deleteImgShelter(deleteImg: DelImagesBucketShelter): Promise<{ message: string, url: string[] }> {
    // check user is owner the shelter
    const checkShelter: { farm: { user_id: number } } | undefined =
      await this.sheltersRepository.getRelationShelter(deleteImg.shelterId);
    if (!checkShelter) throw new ShelterNotFoundException();
    if (checkShelter.farm.user_id !== deleteImg.userId) throw new ShelterAccessException();

    const bucketName = "smafarm";
    const filePaths: string[] = [];

    for (const url of deleteImg.url) {
      const parseUrl = new URL(url);
      const partsUrl = parseUrl.pathname.split('/');
      const bucketIndex = partsUrl.indexOf(bucketName);
      if (bucketIndex === -1) throw new BucketNameException();

      const rawPath = partsUrl.slice(bucketIndex + 1);
      const decodedPath = rawPath.map(path => decodeURIComponent(path));
      const filePath = decodedPath.join('/');
      filePaths.push(filePath);
    }

    // delete all files at onces
    const { error } = await this.supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .remove(filePaths);

    if (error) throw new UploadException(error.message);

    return { message: 'success deleted', url: deleteImg.url };
  }

  async uploadImgLivestock(upload: ImagesUploadLivestock): Promise<{ url: string[] }> {
    if (!upload.files || upload.files.length === 0) {
      throw new FileNotFoundException();
    }

    // Check user is owner of the shelter
    const checkLivestock: OutRelationLivestock | undefined = await this.livestocksRepository.getRelationLivestock(upload.livestockId);
    if (!checkLivestock) throw new ShelterNotFoundException();
    if (checkLivestock.farm.user_id !== upload.userId)
      throw new ShelterAccessException();

    const uploadedUrls: string[] = [];

    for (const file of upload.files) {
      // Generate name and path
      const originalName = file.originalname;
      const fileName = `${Date.now()}-${path.parse(originalName).name}.jpg`;
      const filePath = `livestocks/${upload.livestockId}/${fileName}`;

      // Upload to Supabase bucket
      const { error: uploadError } = await this.supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(filePath, file.buffer, {
          contentType: file.mimetype,
          upsert: true,
        });

      if (uploadError) throw new UploadException(uploadError.message);

      // Get public URL
      const { data: publicUrlData } = this.supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .getPublicUrl(filePath);

      uploadedUrls.push(publicUrlData.publicUrl);
    }

    return { url: uploadedUrls };
  }

  async deleteImgLivestock(deleteImg: DelImagesBucketLivestock): Promise<{ message: string, url: string[] }> {
    // // check user is owner the shelter
    // const checkLivestock: OutRelationLivestock | undefined = await this.livestocksRepository.getRelationLivestock(deleteImg.livestockId);
    // if(!checkLivestock) throw new ShelterNotFoundException();
    // if(checkLivestock.farm.user_id !== deleteImg.userId) throw new ShelterAccessException();
    // // name bucket
    // const bucketName = "smafarm"
    // // get pathname url, example -> "/storage/v1/object/public/smafarm/shelters/123/abc.jpg"
    // const parseUrl = new URL(deleteImg.url);
    // // split url become array string, example -> ["", "storage", "v1", "object", "public", "smafarm", "shelters", "123", "abc.jpg"]
    // const  partsUrl = parseUrl.pathname.split('/');
    // // search position index by bucketName
    // const bucketIndex = partsUrl.indexOf(bucketName);
    // // if not find bucket throw exception
    // if(bucketIndex === -1) throw new BucketNameException();
    // // get all path after bucketName, example -> ["shelters", "123", "abc.jpg"]
    // const rawPath = partsUrl.slice(bucketIndex + 1);
    // // decode raw path for convert special character like spaces
    // const decodedPath = rawPath.map(path => decodeURIComponent(path));
    // // combine raw path with slice for path
    // const filePath = decodedPath.join('/');
    // await this.supabase.storage.from(process.env.SUPABASE_BUCKET).remove([filePath]);
    // return { message: 'success deleted', url: deleteImg.url }    
        // check user is owner the shelter
    const checkLivestock: OutRelationLivestock | undefined = await this.livestocksRepository.getRelationLivestock(deleteImg.livestockId);
    if (!checkLivestock) throw new ShelterNotFoundException();
    if (checkLivestock.farm.user_id !== deleteImg.userId) throw new ShelterAccessException();

    const bucketName = "smafarm";
    const filePaths: string[] = [];

    for (const url of deleteImg.url) {
      const parseUrl = new URL(url);
      const partsUrl = parseUrl.pathname.split('/');
      const bucketIndex = partsUrl.indexOf(bucketName);
      if (bucketIndex === -1) throw new BucketNameException();

      const rawPath = partsUrl.slice(bucketIndex + 1);
      const decodedPath = rawPath.map(path => decodeURIComponent(path));
      const filePath = decodedPath.join('/');
      filePaths.push(filePath);
    }

    // delete all files at onces
    const { error } = await this.supabase.storage
      .from(process.env.SUPABASE_BUCKET)
      .remove(filePaths);

    if (error) throw new UploadException(error.message);

    return { message: 'success deleted', url: deleteImg.url };
  }

}
