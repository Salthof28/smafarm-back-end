import { BadRequestException, Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { ImageUpload, UploadsServiceItf } from './uploads.service.interface';
import * as path from 'path';
import { FileNotFoundException } from './exceptions/file-not-found-exception';
import { UploadException } from './exceptions/upload-exception';
import { BucketNameException } from './exceptions/bucket-name-exception';

@Injectable()
export class UploadsService implements UploadsServiceItf {
  private supabase;

  constructor() {
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

  async uploadImgShelter(upload: ImageUpload): Promise<{ url: string; }> {
    if(!upload.file) throw new FileNotFoundException();
    // name file and path
    const originalName = upload.file.originalname;
    const fileName = `${Date.now()}-${path.parse(originalName).name}.jpg`;
    const filePath = `shelters/${upload.userId}/${fileName}`;
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

  async deleteImgShelter(url: string): Promise<{ message: string; }> {
    console.log(url)
    const bucketName = "smafarm"
    // get pathname url, example -> "/storage/v1/object/public/smafarm/shelters/123/abc.jpg"
    const parseUrl = new URL(url);
    // split url become array string, example -> ["", "storage", "v1", "object", "public", "smafarm", "shelters", "123", "abc.jpg"]
    const  partsUrl = parseUrl.pathname.split('/');
    // search position index by bucketName
    const bucketIndex = partsUrl.indexOf(bucketName);
    // if not find bucket throw exception
    if(bucketIndex === -1) throw new BucketNameException();
    // get all path after bucketName, example -> ["shelters", "123", "abc.jpg"]
    const rawPath = partsUrl.slice(bucketIndex + 1);
    // combine raw path with slice for path
    const filePath = rawPath.join('/');
    await this.supabase.storage.from(process.env.SUPABASE_BUCKET).remove([filePath]);
    return { message: 'success deleted' }
  }

}
