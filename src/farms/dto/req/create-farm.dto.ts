import { StatusUser } from "@prisma/client";
import { IsOptional, IsString } from "class-validator";

export class CreateFarmDto {
    @IsString()
    name: string;
    @IsString()
    location: string;
    @IsString()
    status_farm: StatusUser
    @IsOptional()
    @IsString()
    img_farm?: string;
}
