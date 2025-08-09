import { Expose, Type } from "class-transformer";

export class UrlBodyDto {
    @Expose()
    @Type(() => String)
    url: string;
}