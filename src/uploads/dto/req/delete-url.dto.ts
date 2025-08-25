import { IsArray, IsNumber, IsString } from "class-validator";

export class DeleteUrlDto {
    @IsNumber()
    id: number
    @IsArray()
    @IsString({ each: true })
    url: string[]
}