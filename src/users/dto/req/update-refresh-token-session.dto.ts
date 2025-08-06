import { RoleUser } from "@prisma/client";
import { IsDate, IsEmail, IsNumber, IsString, Matches } from "class-validator";

export class UpdateRefreshTokenSessionDto {
    @IsString()
    id: string
    @IsString()
    refreshToken
    @IsDate()
    expires_at: Date;
}