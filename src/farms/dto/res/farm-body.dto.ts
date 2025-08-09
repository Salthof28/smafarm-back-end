import { Expose, Type } from "class-transformer";

export class FarmBodyDto {
    @Expose()
    @Type(() => Number)
    id: number
    @Expose()
    @Type(() => Number)
    user_id: number
    @Expose()
    @Type(() => String)
    name: string;
    @Expose()
    @Type(() => String)
    location: string;
    @Expose()
    @Type(() => String)
    img_farm: string;
    @Expose()
    @Type(() => String)
    rating: string;
    @Expose()
    @Type(() => Date)
    created_at: Date
    @Expose()
    @Type(() => Date)
    updated_at: Date
}