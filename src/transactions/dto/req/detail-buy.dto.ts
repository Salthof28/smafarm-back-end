import { Prisma } from "@prisma/client";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateDetailBuyDto {
    @IsNumber()
    livestock_id: number;
    @IsNumber()
    total_livestock: number;
    @IsString()
    address: string
    @IsOptional()
    @IsNumber()
    unit_price?: Prisma.Decimal;
    @IsOptional()
    @IsNumber()
    sub_total?: Prisma.Decimal;
}