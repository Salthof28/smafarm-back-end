import { Expose, Type } from "class-transformer";

export class TokenBodyDto {
    @Expose()
    @Type(() => String)
    access_token: string;
    @Expose()
    @Type(() => String)
    refresh_token: string;
}