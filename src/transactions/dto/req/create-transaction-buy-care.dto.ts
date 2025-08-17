import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateTransactionDto } from "./transaction.dto";
import { CreateCareTransactionDto } from "./care-transaction.dto";
import { CreateDetailBuyDto } from "./detail-buy.dto";

export class CreateTransactionBuyCareDto {
    @ValidateNested()
    @Type(() => CreateTransactionDto)
    transaction: CreateTransactionDto;
    @ValidateNested({ each: true })
    @Type(() => CreateCareTransactionDto)
    care: CreateCareTransactionDto[];
    @ValidateNested({ each: true })
    @Type(() => CreateDetailBuyDto)
    buy: CreateDetailBuyDto[];
}