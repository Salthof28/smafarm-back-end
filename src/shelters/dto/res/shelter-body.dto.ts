import { Expose, Type } from "class-transformer";

export class ShelterBodyDto {
    @Expose()
    @Type(() => Number)
    id: number
    @Expose()
    @Type(() => Number)
    category_id: number
    @Expose()
    @Type(() => Number)
    farm_id: number
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
    @Type(() => Date)
    created_at: Date
    @Expose()
    @Type(() => Date)
    updated_at: Date
    @Expose()
    img_shelter;
    @Expose()
    care_give
}