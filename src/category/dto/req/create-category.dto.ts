import { IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    name: string;
    @IsOptional()
    @IsString()
    img_category?: string
}