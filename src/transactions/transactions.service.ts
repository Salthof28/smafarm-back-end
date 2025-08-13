import { Inject, Injectable } from '@nestjs/common';
import { TransactionsServiceItf } from './transactions.service.interface';
import { TransactionsRepositoryItf } from './transactions.repository.interface';

@Injectable()
export class TransactionsService implements TransactionsServiceItf {
  constructor(@Inject('TransactionsRepositoryItf') private readonly transactionsRepository: TransactionsRepositoryItf){}
}
