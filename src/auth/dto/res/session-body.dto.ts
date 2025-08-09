import { Expose, Type } from "class-transformer";

export class SessionBodyDto {
    @Expose()
    @Type(() => Number)
    id: number;
    @Expose()
    @Type(() => Number)
    user_id: number;
    @Expose()
    @Type(() => String)
    id_token: string;
    @Expose()
    @Type(() => String)
    refreshToken: string;
    @Expose()
    @Type(() => String)
    userAgent: string;
    @Expose()
    @Type(() => String)
    ipAddress: string;
    @Expose()
    @Type(() => String)
    created_at: string;
    @Expose()
    @Type(() => String)
    expires_at: string;
}