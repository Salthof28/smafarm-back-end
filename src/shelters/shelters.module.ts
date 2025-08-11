import { Module } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { SheltersController } from './shelters.controller';
import { SheltersRepository } from './shelters.repository';
import { FarmsModule } from '../farms/farms.module';

@Module({
  imports: [FarmsModule],
  controllers: [SheltersController],
  providers: [
    { provide: 'SheltersServiceItf', useClass: SheltersService },
    { provide: 'SheltersRepositoryItf', useClass: SheltersRepository }
  ],
  exports: ['SheltersRepositoryItf']
})
export class SheltersModule {}
