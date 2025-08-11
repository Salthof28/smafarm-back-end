import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { SheltersModule } from 'src/shelters/shelters.module';

@Module({
  imports: [SheltersModule],
  controllers: [UploadsController],
  providers: [
    { provide: 'UploadsServiceItf', useClass: UploadsService }
  ],
})
export class UploadsModule {}
