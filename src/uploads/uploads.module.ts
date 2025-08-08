import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';

@Module({
  controllers: [UploadsController],
  providers: [
    { provide: 'UploadsServiceItf', useClass: UploadsService }
  ],
})
export class UploadsModule {}
