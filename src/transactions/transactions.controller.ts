import { Controller, Get, Post, Body, Patch, Param, Delete, Inject } from '@nestjs/common';
import { TransactionsServiceItf } from './transactions.service.interface';

@Controller('transactions')
export class TransactionsController {
  constructor(@Inject('TransactionsServiceItf') private readonly transactionsService: TransactionsServiceItf) {}

}
