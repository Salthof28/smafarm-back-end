import { Inject, Injectable } from '@nestjs/common';
import { CreateFarmDto } from './dto/req/create-farm.dto';
import { UpdateFarmDto } from './dto/req/update-farm.dto';
import { FarmsServiceItf } from './farms.service.interface';
import { FarmsRepositoryItf } from './farms.repository.interface';

@Injectable()
export class FarmsService implements FarmsServiceItf {
    constructor(@Inject('FarmsRepositoryItf') private readonly farmsRepository: FarmsRepositoryItf){}
}
