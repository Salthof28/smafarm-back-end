import { Expose, Type } from "class-transformer";

export class LivestockBodyDto {
    @Expose()
    @Type(() => Number)
    id: number
    @Expose()
    @Type(() => Number)
    farm_id: number
    @Expose()
    @Type(() => String)
    title: string;
    @Expose()
    @Type(() => Number)
    age: number;
    @Expose()
    @Type(() => Number)
    price: number;
    @Expose()
    @Type(() => Number)
    stock: number;
    @Expose()
    @Type(() => String)
    description: string;
    @Expose()
    @Type(() => String)
    location: string;
    @Expose()
    @Type(() => Date)
    created_at: Date
    @Expose()
    @Type(() => Date)
    updated_at: Date
    @Expose()
    category;
    @Expose()
    img_livestock;
}