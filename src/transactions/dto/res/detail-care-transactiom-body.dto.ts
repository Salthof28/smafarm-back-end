import { Expose, Type } from "class-transformer";

export class DetailCareTransactionBodyDto {
    @Expose()
    @Type(() => Number)
    id: number;
    @Expose()
    @Type(() => Number)
    careTransaction_id: number;
    @Expose()
    @Type(() => Number)
    careGive_id: number;
}