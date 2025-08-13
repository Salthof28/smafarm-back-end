import { Prisma } from "@prisma/client";
import { IsNumber } from "class-validator";

export class CreateDetailBuyDto {
    @IsNumber()
    transaction_id: number;
    @IsNumber()
    livestock_id: number;
    @IsNumber()
    total_livestock: number;
    @IsNumber()
    unit_price: Prisma.Decimal;
    @IsNumber()
    sub_total: Prisma.Decimal;
}