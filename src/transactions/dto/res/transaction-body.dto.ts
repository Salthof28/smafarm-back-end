import { Prisma } from "@prisma/client";
import { Expose, Type } from "class-transformer";
import { DetailBuyTransactionBodyDto } from "./detail-buy-transaction-body.dto";
import { CareTransactionBodyDto } from "./care-transaction-body.dto";

export class TransactionBodyDto {
    @Expose()
    @Type(() => Number)
    id: number;
    @Expose()
    @Type(() => Number)
    customer_id: number;
    @Expose()
    @Type(() => Number)
    farm_id: number;
    @Expose()
    @Type(() => Date)
    date_transaction: Date;
    @Expose()
    @Type(() => Number)
    total_amount: Prisma.Decimal;
    @Expose()
    @Type(() => String)
    status_transaction: string;
    @Expose()
    @Type(() => Number)
    rating: number;
    @Expose()
    @Type(() => String)
    review: string;
    @Type(() => Date)
    created_at: Date
    @Expose()
    @Type(() => Date)
    updated_at: Date
    @Expose()
    user;
    @Expose()
    farm;
    @Expose()
    @Type(() => DetailBuyTransactionBodyDto)
    detail_buy: DetailBuyTransactionBodyDto[];
    @Expose()
    @Type(() => CareTransactionBodyDto)
    care_transaction: CareTransactionBodyDto[]
}