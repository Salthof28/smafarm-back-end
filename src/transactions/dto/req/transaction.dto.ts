import { Prisma } from "@prisma/client";
import { IsDate, IsNumber, IsOptional } from "class-validator";

export class CreateTransactionDto {
    @IsNumber()
    id_farm: number;
    @IsOptional()
    @IsNumber()
    total_amount?: Prisma.Decimal;
}
export class TransactionDto {
    @IsNumber()
    id_customer: number;
    @IsNumber()
    id_farm: number;
    @IsOptional()
    @IsNumber()
    total_amount?: Prisma.Decimal;
}
