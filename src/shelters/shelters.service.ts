import { Inject, Injectable } from '@nestjs/common';
import { SheltersServiceItf } from './shelters.service.interface';
import { SheltersRepositoryItf } from './shelters.repository.interface';


@Injectable()
export class SheltersService implements SheltersServiceItf {
  constructor(@Inject('SheltersRepositoryItf') private readonly sheltersRepository: SheltersRepositoryItf){}
}
