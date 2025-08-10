import { Expose, Type } from "class-transformer";

export class ShelterBodyDto {
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





