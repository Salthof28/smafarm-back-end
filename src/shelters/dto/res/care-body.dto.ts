import { Expose, Type } from "class-transformer";

export class CareBodyDto {
    @Expose()
    @Type(() => Number)
    id: number
    @Expose()
    @Type(() => Number)
    shelter_id: number;
    @Expose()
    @Type(() => String)
    name: string;
    @Expose()
    @Type(() => Number)
    price: number
    @Expose()
    @Type(() => String)
    unit: string;
    @Expose()
    @Type(() => Boolean)
    required: boolean;
}





