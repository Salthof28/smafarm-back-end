import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString } from 'class-validator';
import { StatusUser } from '@prisma/client';

export class UpdateUserDto extends PartialType(CreateUserDto) {
        @IsString()
        status: StatusUser;
        @IsOptional()
        @IsString()
        img_profile: string;
}
