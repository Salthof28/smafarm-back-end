import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { SheltersModule } from '../shelters/shelters.module';
import { LivestocksModule } from '../livestocks/livestocks.module';
import { FarmsModule } from '../farms/farms.module';

@Module({
  imports: [SheltersModule, LivestocksModule, FarmsModule],
  controllers: [UploadsController],
  providers: [
    { provide: 'UploadsServiceItf', useClass: UploadsService }
  ],
})
export class UploadsModule {}
