import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateTransactionDto } from "./transaction.dto";
import { CreateCareTransactionDto } from "./care-transaction.dto";

export class CreateTransactionCareDto {
    @ValidateNested()
    @Type(() => CreateTransactionDto)
    transaction: CreateTransactionDto;
    @ValidateNested()
    @Type(() => CreateCareTransactionDto)
    care: CreateCareTransactionDto[];
}