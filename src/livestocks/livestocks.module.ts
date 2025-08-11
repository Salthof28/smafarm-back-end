import { Module } from '@nestjs/common';
import { LivestocksService } from './livestocks.service';
import { LivestocksController } from './livestocks.controller';
import { LivestocksRepository } from './livestocks.repository';

@Module({
  controllers: [LivestocksController],
  providers: [
    { provide: 'LivestocksServiceItf', useClass: LivestocksService },
    { provide: 'LivestocksRepositoryItf', useClass: LivestocksRepository }
  ],
  exports: ['LivestocksRepositoryItf']
})
export class LivestocksModule {}
