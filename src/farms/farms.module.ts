import { Module } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { FarmsController } from './farms.controller';
import { FarmsRepository } from './farms.repository';

@Module({
  controllers: [FarmsController],
  providers: [
    { provide: 'FarmsServiceItf', useClass: FarmsService },
    { provide: 'FarmsRepositoryItf', useClass: FarmsRepository }
  ],
})
export class FarmsModule {}
