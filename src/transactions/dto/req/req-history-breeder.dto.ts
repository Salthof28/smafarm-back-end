import { IsNumber } from "class-validator";

export class ReqHistoryBreeder {
    @IsNumber()
    id_farm: number;
}