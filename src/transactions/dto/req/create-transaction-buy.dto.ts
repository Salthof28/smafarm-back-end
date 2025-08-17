import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateTransactionDto } from "./transaction.dto";
import { CreateDetailBuyDto } from "./detail-buy.dto";

export class CreateTransactionBuyDto {
    @ValidateNested()
    @Type(() => CreateTransactionDto)
    transaction: CreateTransactionDto;
    @ValidateNested()
    @Type(() => CreateDetailBuyDto)
    buy: CreateDetailBuyDto[];
}