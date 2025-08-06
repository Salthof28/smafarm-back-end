import { RoleUser } from "@prisma/client";
import { IsEmail, IsString, Matches } from "class-validator";

export class CreateUserDto {
    @IsString()
    name: string;
    @IsEmail()
    email: string;
    @Matches(/^\d{10,15}$/, { message: 'Phone must be a valid number' })
    phone: string;
    @IsString()
    password: string;
    @IsString()
    role: RoleUser
}
