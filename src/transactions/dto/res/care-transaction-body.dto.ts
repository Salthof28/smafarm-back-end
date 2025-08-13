import { Prisma } from "@prisma/client";
import { Expose, Type } from "class-transformer";

export class CareTransactionBodyDto {
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
    shelter_id: number;
    @Expose()
    @Type(() => Number)
    duration_id: number;
    @Type(() => Date)
    start_date: Date;
    @Expose()
    @Type(() => Date)
    finish_date: Date;
    @Expose()
    @Type(() => Number)
    one_day_price: Prisma.Decimal;
    @Expose()
    @Type(() => Number)
    sub_total: Prisma.Decimal;
}