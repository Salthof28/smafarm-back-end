import { RoleUser, StatusUser } from "@prisma/client";
import { IsEmail, IsOptional, IsString, Matches } from "class-validator";

export class UpdatedUserByAdminDto {
    @IsOptional()
    @IsString()
    status: StatusUser;
    @IsOptional()
    @IsString()
    role: RoleUser;
}