import { Prisma, UnitCare } from "@prisma/client";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreateCareDto {
    @IsNumber()
    shelter_id: number;
    @IsString()
    name: string;
    @IsNumber()
    price: Prisma.Decimal
    @IsString()
    unit: UnitCare;
    @IsBoolean()
    required: boolean;
}