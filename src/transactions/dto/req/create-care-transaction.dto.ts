
import { Prisma } from "@prisma/client";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateCareTransactionDto {
    @IsNumber()
    transaction_id: number;
    @IsNumber()
    livestock_id: number;
    @IsNumber()
    shelter_id: number;
    @IsNumber()
    duration_care: number
    @IsDate()
    start_date: Date;
    @IsDate()
    finish_date: Date;
    @IsNumber()
    one_day_price: Prisma.Decimal;
    @IsNumber()
    sub_total: Prisma.Decimal;
}