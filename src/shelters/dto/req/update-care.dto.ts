import { PartialType } from '@nestjs/mapped-types';
import { CreateCareDto } from './create-care.dto';
import { IsNumber } from 'class-validator';

export class UpdateCareDto extends PartialType(CreateCareDto) {
        @IsNumber()
        id: number
}
