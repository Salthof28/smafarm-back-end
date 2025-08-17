import { PartialType } from '@nestjs/mapped-types';
import { CreateTransactionDto } from './transaction.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { StatusTransaction } from '@prisma/client';

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
    @IsOptional()
    @IsNumber()
    rating?: number;
    @IsOptional()
    @IsString()
    review?: string;
    @IsOptional()
    @IsString()
    status_transaction?: StatusTransaction;
}
