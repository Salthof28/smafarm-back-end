import { Prisma } from "@prisma/client";
import { Expose, Type } from "class-transformer";
import { DetailCareTransactionBodyDto } from "./detail-care-transactiom-body.dto";
import { ShelterBodyDto } from "src/shelters/dto/res/shelter-body.dto";

export class CareTransactionBodyDto {
    @Expose()
    @Type(() => Number)
    id: number;
    @Expose()
    @Type(() => Number)
    transaction_id: number;
    @Expose()
    @Type(() => Number)
    duration_care: number
    @Expose()
    @Type(() => Number)
    livestock_id: number;
    @Expose()
    @Type(() => Number)
    total_livestock: number
    @Expose()
    @Type(() => Number)
    shelter_id: number;
    @Expose()
    @Type(() => Number)
    duration_id: number;
    @Expose()
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
    @Expose()
    @Type(() => DetailCareTransactionBodyDto)
    detail_care: DetailCareTransactionBodyDto[];
    @Expose()
    @Type(() => ShelterBodyDto)
    shelter: ShelterBodyDto;
    @Expose()
    transaction;
}