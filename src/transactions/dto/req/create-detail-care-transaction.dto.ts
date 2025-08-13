import { IsNumber } from "class-validator";


export class CreateDetailCareTransactioDto {
    @IsNumber()
    careTransaction_id: number;
    @IsNumber()
    careGive_id: number;
}