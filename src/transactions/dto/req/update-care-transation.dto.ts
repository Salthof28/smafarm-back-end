import { PartialType } from "@nestjs/mapped-types";
import { CreateCareTransactionDto } from "./care-transaction.dto";
import { IsDateString } from "class-validator";


export class UpdateCareTransactionDto extends PartialType(CreateCareTransactionDto) {
        @IsDateString()
        start_date: string;
        @IsDateString()
        finish_date: string;
}