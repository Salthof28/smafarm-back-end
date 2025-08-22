import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, InternalServerErrorException, Query, UseGuards, Request, ParseIntPipe } from '@nestjs/common';
import { TransactionsServiceItf } from './transactions.service.interface';
import { CreateTransactionCareDto } from './dto/req/create-transaction-care.dto';
import { CareTransaction, Transaction } from '@prisma/client';
import { CustomExceptionGen } from '../global/exception/exception.general';
import { RolesGuard } from '../global/guards/roles.guard';
import { Roles } from '../global/decorator/roles.decorator';
import { Role } from '../global/enum/role.enum';
import { JwtAuthGuard } from '../global/guards/jwt-auth.guard';
import { CreateTransactionBuyDto } from './dto/req/create-transaction-buy.dto';
import { CreateTransactionBuyCareDto } from './dto/req/create-transaction-buy-care.dto';
import { UpdateTransactionDto } from './dto/req/update-transaction.dto';
import { UpdateDetailBuyDto } from './dto/req/update-detail-buy.dto';
import { UpdateCareTransactionDto } from './dto/req/update-care-transation.dto';
import { TransformRes } from '../global/interceptors/transform-body-res.interceptor';
import { TransactionBodyDto } from './dto/res/transaction-body.dto';
import { CareTransactionBodyDto } from './dto/res/care-transaction-body.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(@Inject('TransactionsServiceItf') private readonly transactionsService: TransactionsServiceItf) {}

  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Get()
  @TransformRes(TransactionBodyDto)
  async getAllTransaction(@Query('customer_id') customer_id?: number, @Query('farm_id') farm_id?: number, @Query('transaction_status') transaction_status?: string): Promise<Transaction[]> {
    try {
      const allTransactions: Transaction[] = await this.transactionsService.getAllTransaction({
        customer_id,
        farm_id,
        transaction_status
      });
      return allTransactions;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }    
  };

  @UseGuards(JwtAuthGuard)
  @Get('history')
  @TransformRes(TransactionBodyDto)
  async getHistoryTransaction(@Request() request): Promise<Transaction[]> {
    try {
      const customer_id: number = request.user.id
      const allTransactions: Transaction[] = await this.transactionsService.getAllTransaction({
        customer_id,
      });
      return allTransactions;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }    
  };

  @Get('care')
  @TransformRes(CareTransactionBodyDto)
  async getAllCareByShelter(@Query('shelter_id') shelter_id: number): Promise<CareTransaction[]> {
    try {
      const allTransactions: CareTransaction[] = await this.transactionsService.getAllCareByShelter(shelter_id);
      return allTransactions;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }    
  };
  
  @UseGuards(JwtAuthGuard)
  @Post('transactioncare')
  @TransformRes(TransactionBodyDto)
  async createTransactionCare (@Request() request, @Body() body: CreateTransactionCareDto): Promise<Transaction> {
    try {
      const id_customer: number = request.user.id
      const careTransaction: Transaction = await this.transactionsService.transactionCare({
        transaction: {
          id_customer,
          ...body.transaction
        },
        care: body.care
      });
      return careTransaction;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  };

  @UseGuards(JwtAuthGuard)
  @Post('transactionbuy')
  @TransformRes(TransactionBodyDto)
  async createTransactionBuy (@Request() request, @Body() body: CreateTransactionBuyDto): Promise<Transaction> {
    try {
      const id_customer: number = request.user.id
      const buyTransaction: Transaction = await this.transactionsService.transactionBuy({
        transaction: {
          id_customer,
          ...body.transaction
        },
        buy: body.buy
      });
      return buyTransaction;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  };

  @UseGuards(JwtAuthGuard)
  @Post('transactionbuycare')
  @TransformRes(TransactionBodyDto)
  async createTransactionBuyCare (@Request() request, @Body() body: CreateTransactionBuyCareDto): Promise<Transaction> {
    try {
      const id_customer: number = request.user.id
      const buyCareTransaction: Transaction = await this.transactionsService.transactionBuyCare({
        transaction: {
          id_customer,
          ...body.transaction
        },
        buy: body.buy,
        care: body.care
      });
      return buyCareTransaction;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  };

  @UseGuards(RolesGuard)
  @Roles(Role.BREEDER)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @TransformRes(TransactionBodyDto)
  async updateStatusTransaction (@Param('id', ParseIntPipe) id: number, @Request() request, @Body() body: UpdateTransactionDto): Promise<Transaction> {
    try {
      const user_id: number = request.user.id
      const update: Transaction = await this.transactionsService.updateStatus({
        user_id,
        id,
        transaction: body 
      });
      return update
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  };

  @UseGuards(JwtAuthGuard)
  @Patch('transactionbuy/:id')
  @TransformRes(TransactionBodyDto)
  async updateBuyTransaction(@Param('id', ParseIntPipe) id: number, @Request() request, @Body() body: UpdateDetailBuyDto): Promise<Transaction> {
    try {
      const user_id: number = request.user.id
      const updateBuy: Transaction = await this.transactionsService.updatedBuy({
        user_id,
        id,
        buy: body
      });
      return updateBuy;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  @UseGuards(JwtAuthGuard)
  @Patch('transactioncare/:id')
  @TransformRes(TransactionBodyDto)
  async resheduleCareTransaction(@Param('id', ParseIntPipe) id: number, @Request() request, @Body() body: UpdateCareTransactionDto): Promise<Transaction> {
    try {
      const user_id: number = request.user.id
      const updateCare: Transaction = await this.transactionsService.resheduleCare({
        user_id,
        id,
        care: body
      });
      return updateCare;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

}
