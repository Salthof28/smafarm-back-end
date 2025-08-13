import { Prisma } from "@prisma/client";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateTransactionDto {
    @IsNumber()
    id_customer: number;
    @IsNumber()
    id_farm: number;
    @IsDate()
    date_transaction: Date;
    @IsNumber()
    total_amount: Prisma.Decimal;
    @IsString()
    status_transaction: string;
}
