import { Injectable } from '@nestjs/common';
import { TransactionsRepositoryItf } from './transactions.repository.interface';
import { PrismaService } from 'prisma/prisma.service';
import { Condition } from 'src/global/entities/condition-entity';
import { handlePrismaError } from 'src/global/utils/prisma.error.util';
import { Transaction } from '@prisma/client';

@Injectable()
export class TransactionsRepository implements TransactionsRepositoryItf {
    constructor(private readonly prisma: PrismaService){}

    async getAll(query?: Condition): Promise<Transaction[] | undefined> {
        try {
            const where: Condition = {}
            if(query?.customer_id || query?.farm_id || query?.status){
                where.OR = [];
                if(query.customer_id) where.OR.push({ customer_id: query.customer_id });
                if(query.farm_id) where.OR.push({ farm_id: query.farm_id });
                if(query.status) where.OR.push({ status_transaction: query.status });
            }
            
            const allTransaction: Transaction[] = await this.prisma.transaction.findMany({ where })
            if(allTransaction.length < 1) return undefined;
            return allTransaction;
        } catch (error) {
            handlePrismaError(error);
        }        
    };

    async getOne(id: number): Promise<Transaction | undefined> {
        try {
            const transaction: Transaction | null = await this.prisma.transaction.findUnique({
                where: { id }
            });
            if(transaction === null) return undefined;
            return transaction
        } catch (error) {
            handlePrismaError(error);
        }          
    }
}