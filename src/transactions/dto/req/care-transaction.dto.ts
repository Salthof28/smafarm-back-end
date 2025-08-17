
import { OmitType } from "@nestjs/mapped-types";
import { Prisma } from "@prisma/client";
import { IsArray, IsDate, IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCareTransactionDto {
    @IsOptional()
    @IsNumber()
    livestock_id?: number;
    @IsNumber()
    shelter_id: number;
    @IsNumber()
    total_livestock: number
    @IsOptional()
    @IsNumber()
    duration_care?: number
    @IsDateString()
    start_date: string;
    @IsDateString()
    finish_date: string;
    @IsOptional()
    @IsNumber()
    one_day_price?: Prisma.Decimal;
    @IsOptional()
    @IsNumber()
    sub_total?: Prisma.Decimal;
    @IsArray()
    @IsNumber({}, { each: true })
    careGive_id: number[];
}