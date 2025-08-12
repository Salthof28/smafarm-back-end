import { Prisma } from "@prisma/client";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateLivestockDto {
    @IsNumber()
    category_id: number;
    @IsString()
    name: string;
    @IsNumber()
    age: number;
    @IsNumber()
    price: Prisma.Decimal;
    @IsNumber()
    stock: number;
    @IsString()
    description: string
    @IsString()
    location: string;
    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    img_livestock?: string[];
}
