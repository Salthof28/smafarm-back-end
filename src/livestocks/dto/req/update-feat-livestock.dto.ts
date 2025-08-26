import { IsArray, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UpdateLivestockDto } from "./update-livestock.dto";

export class AllUpdateFeatLivestockDto {
  @IsNumber()
  livestock_id: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateLivestockDto)
  livestock?: UpdateLivestockDto;

  @IsOptional()
  @IsArray()
  uploadImage?: string[];

  @IsOptional()
  @IsArray()
  deleteImage?: number[];

}