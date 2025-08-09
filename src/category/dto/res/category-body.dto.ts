import { Expose, Type } from "class-transformer";

export class CategoryBodyDto {
    @Expose()
    @Type(() => Number)
    id: number
    @Expose()
    @Type(() => String)
    name: string;
    @Expose()
    @Type(() => String)
    img_category: string;
    @Expose()
    @Type(() => Date)
    created_at: Date
    @Expose()
    @Type(() => Date)
    updated_at: Date
}