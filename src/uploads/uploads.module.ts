import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { SheltersModule } from '../shelters/shelters.module';
import { LivestocksModule } from '../livestocks/livestocks.module';

@Module({
  imports: [SheltersModule, LivestocksModule],
  controllers: [UploadsController],
  providers: [
    { provide: 'UploadsServiceItf', useClass: UploadsService }
  ],
})
export class UploadsModule {}
