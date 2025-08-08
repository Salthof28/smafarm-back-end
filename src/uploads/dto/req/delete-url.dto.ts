import { IsDate, IsEmail, IsNumber, IsString, Matches } from "class-validator";

export class DeleteUrlDto {
    @IsString()
    url: string
}