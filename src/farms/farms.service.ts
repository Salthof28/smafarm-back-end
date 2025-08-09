import { Inject, Injectable } from '@nestjs/common';
import { BuildFarm, FarmsServiceItf, UpdateFarm } from './farms.service.interface';
import { FarmsRepositoryItf } from './farms.repository.interface';
import { Farms } from '@prisma/client';
import { Condition } from '../global/entities/condition-entity';
import { FarmNotFoundException } from './exception/farm-not-found-exception';

@Injectable()
export class FarmsService implements FarmsServiceItf {
    constructor(@Inject('FarmsRepositoryItf') private readonly farmsRepository: FarmsRepositoryItf){}

    async getAllFarms(query?: Condition): Promise<Farms[]> {
        const allFarms: Farms[] | undefined = await this.farmsRepository.getAll(query);
        if(!allFarms) throw new FarmNotFoundException();
        return allFarms;
    };
    
    async getFarm(id: number): Promise<Farms> {
        const farm: Farms | undefined = await this.farmsRepository.getFarm(id);
        if(!farm) throw new FarmNotFoundException();
        return farm;
    };

    async createdFarm(body: BuildFarm): Promise<Farms> {
        const createFarm: Farms = await this.farmsRepository.created(body);
        return createFarm;
    };

    async updatedFarm(farm: UpdateFarm): Promise<Farms> {
        const updateFarm: Farms = await this.farmsRepository.updated(farm);
        return updateFarm;
    };

    async updatedFarmByAdmin(farm: UpdateFarm): Promise<Farms> {
        const updateFarm: Farms = await this.farmsRepository.updatedByAdmin(farm);
        return updateFarm;
    }

    async deletedFarm(id: number): Promise<Farms> {
        const deleteFarm: Farms = await this.farmsRepository.deleted(id);
        return deleteFarm;
    }
}
