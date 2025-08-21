import { Expose, Type } from "class-transformer";
import { CareBodyDto } from "./care-body.dto";
import { CareTransactionBodyDto } from "src/transactions/dto/res/care-transaction-body.dto";

export class ShelterBodyDto {
    @Expose()
    @Type(() => Number)
    id: number;
    @Expose()
    @Type(() => Number)
    farm_id: number;
    @Expose()
    @Type(() => String)
    name: string;
    @Expose()
    @Type(() => String)
    location: string;
    @Expose()
    @Type(() => Number)
    accomodate: number;
    @Expose()
    @Type(() => String)
    description: string;
    @Expose()
    @Type(() => Number)
    price_daily: number;
    @Expose()
    @Type(() => Date)
    created_at: Date
    @Expose()
    @Type(() => Date)
    updated_at: Date
    @Expose()
    farm;
    @Expose()
    category;
    @Expose()
    img_shelter;
    @Expose()
    @Type(() => CareTransactionBodyDto)
    transaction: CareTransactionBodyDto[];
    @Expose()
    @Type(() => CareBodyDto)
    care_give: CareBodyDto[]
}