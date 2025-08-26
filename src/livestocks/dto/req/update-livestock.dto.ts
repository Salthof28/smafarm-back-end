import { PartialType } from '@nestjs/mapped-types';
import { CreateLivestockDto } from './create-livestock.dto';
import { IsNumber } from 'class-validator';

export class UpdateLivestockDto extends PartialType(CreateLivestockDto) {
    @IsNumber()
    id: number
}
