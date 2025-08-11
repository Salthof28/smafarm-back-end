import { IsNumber, IsString } from "class-validator";

export class DeleteUrlDto {
    @IsNumber()
    id: number
    @IsString()
    url: string
}