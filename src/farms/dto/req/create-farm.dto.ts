import { IsNumber, IsString } from "class-validator";

export class CreateFarmDto {
    @IsNumber()
    user_id: number;
    @IsString()
    name: string;
    @IsString()
    location: string;
    @IsString()
    img_farm: string;
}
