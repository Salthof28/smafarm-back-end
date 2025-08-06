import { RoleUser } from "@prisma/client";
import { IsDate, IsEmail, IsNumber, IsString, Matches } from "class-validator";

export class UpdateRefreshTokenSessionDto {
    @IsNumber()
    id: number
    @IsString()
    id_token: string
    @IsString()
    refreshToken
    @IsDate()
    expires_at: Date;
}