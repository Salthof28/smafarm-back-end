import { Inject, Injectable } from '@nestjs/common';
import { CreateLivestockDto } from './dto/req/create-livestock.dto';
import { UpdateLivestockDto } from './dto/req/update-livestock.dto';
import { LivestocksServiceItf } from './livestocks.service.interface';
import { LivestocksRepositoryItf } from './livestocks.repository.interface';

@Injectable()
export class LivestocksService implements LivestocksServiceItf {
  constructor(@Inject('LivestocksRepositoryItf') private readonly livestocksRepository: LivestocksRepositoryItf){}
  
}
