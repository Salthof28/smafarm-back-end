import { IsEmail, IsOptional, IsString, Matches } from "class-validator";

export class UpdatedUserProfileDto {
    @IsOptional()
    @IsString()
    name: string;
    @IsOptional()
    @IsEmail()
    email: string;
    @IsOptional()
    @Matches(/^\d{10,15}$/, { message: 'Phone must be a valid number' })
    phone: string;
    @IsOptional()
    @IsString()
    password: string;
    @IsOptional()
    @IsString()
    img_profile: string;
}