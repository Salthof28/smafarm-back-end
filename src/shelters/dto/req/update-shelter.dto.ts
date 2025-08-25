import { PartialType } from '@nestjs/mapped-types';
import { CreateShelterDto } from './create-shelter.dto';
import { IsNumber } from 'class-validator';

export class UpdateShelterDto extends PartialType(CreateShelterDto) {
    @IsNumber()
    id: number
}
