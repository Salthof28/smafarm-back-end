import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateFarmDto {
    @IsString()
    name: string;
    @IsString()
    location: string;
    @IsOptional()
    @IsString()
    img_farm?: string;
}
