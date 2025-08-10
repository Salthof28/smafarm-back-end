import { Module } from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { SheltersController } from './shelters.controller';
import { SheltersRepository } from './shelters.repository';

@Module({
  controllers: [SheltersController],
  providers: [
    { provide: 'SheltersServiceItf', useClass: SheltersService },
    { provide: 'SheltersRepositoryItf', useClass: SheltersRepository }
  ],
})
export class SheltersModule {}
