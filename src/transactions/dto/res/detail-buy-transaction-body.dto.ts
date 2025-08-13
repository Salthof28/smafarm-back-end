import { Prisma } from "@prisma/client";
import { Expose, Type } from "class-transformer";

export class DetailBuyTransactionBodyDto {
    @Expose()
    @Type(() => Number)
    id: number;
    @Expose()
    @Type(() => Number)
    transaction_id: number;
    @Expose()
    @Type(() => Number)
    livestock_id: number;
    @Expose()
    @Type(() => Number)
    total_livestock: number;
    @Expose()
    @Type(() => Number)
    unit_price: Prisma.Decimal;
    @Expose()
    @Type(() => Number)
    sub_total: Prisma.Decimal;
    @Expose()
    livestock;
}