import { Prisma } from "@prisma/client";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateShelterDto {
    @IsNumber()
    category_id: number;
    @IsString()
    name: string;
    @IsString()
    location: string;
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    img_shelter?: string[]
    @IsNumber()
    accomodate: number;
    @IsString()
    description: string;
    @IsNumber()
    price_daily: Prisma.Decimal
}
