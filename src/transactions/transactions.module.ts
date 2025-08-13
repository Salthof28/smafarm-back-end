import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsRepository } from './transactions.repository';

@Module({
  controllers: [TransactionsController],
  providers: [
    { provide: 'TransactionsServiceItf', useClass: TransactionsService },
    { provide: 'TransactionsRepositoryItf', useClass: TransactionsRepository }
  ],
})
export class TransactionsModule {}
