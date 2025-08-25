import { IsArray, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UpdateShelterDto } from "./update-shelter.dto";
import { CreateCareDto } from "./create-care.dto";
import { UpdateCareDto } from "./update-care.dto";

export class AllUpdateFeatShelterDto {
  @IsNumber()
  shelter_id: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateShelterDto)
  shelter?: UpdateShelterDto;

  @IsOptional()
  @IsArray()
  uploadImage?: string[];

  @IsOptional()
  @IsArray()
  deleteImage?: number[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCareDto)
  newCare?: CreateCareDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UpdateCareDto)
  updateCare?: UpdateCareDto[];

  @IsOptional()
  @IsArray()
  deleteCare?: number[];
}
