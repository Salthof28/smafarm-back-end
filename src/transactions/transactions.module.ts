import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';
import { SheltersModule } from 'src/shelters/shelters.module';
import { LivestocksModule } from 'src/livestocks/livestocks.module';

@Module({
  imports: [SheltersModule, LivestocksModule],
  controllers: [TransactionsController],
  providers: [
    { provide: 'TransactionsServiceItf', useClass: TransactionsService },
    { provide: 'TransactionsRepositoryItf', useClass: TransactionsRepository }
  ],
})
export class TransactionsModule {}
