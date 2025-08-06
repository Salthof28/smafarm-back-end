import { IsDate, IsEmail, IsNumber, IsString, Matches } from "class-validator";

export class SessionDetailDto {
    @IsNumber()
    user_id: number
    @IsString()
    id_token: string
    @IsString()
    refreshToken
    @IsString()
    userAgent: string;
    @IsString()
    ipAddress: string
    @IsDate()
    expires_at: Date;
}
