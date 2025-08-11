import { Type } from "class-transformer";
import { IsNumber } from "class-validator";


export class IdUploadDto {    
    @Type(() => Number)
    @IsNumber()
    id: number
}