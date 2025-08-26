import { Inject, Injectable } from '@nestjs/common';
import { DeleteLivestock, LivestocksServiceItf, ServiceCreateLivestock, ServiceUpdateLivestock, UpdateDatLivestockService } from './livestocks.service.interface';
import { LivestocksRepositoryItf, OutDetailLivestock, OutRelationLivestock } from './livestocks.repository.interface';
import { Farms, Livestock } from '@prisma/client';
import { Condition } from '../global/entities/condition-entity';
import { LivestockNotFoundException } from './exception/livestock-not-found-exception';
import { FarmsRepositoryItf } from '../farms/farms.repository.interface';
import { FarmNotFoundException } from '../farms/exception/farm-not-found-exception';
import { LivestockAccessException } from './exception/livestock-access-exception';

@Injectable()
export class LivestocksService implements LivestocksServiceItf {
  constructor(@Inject('LivestocksRepositoryItf') private readonly livestocksRepository: LivestocksRepositoryItf, @Inject('FarmsRepositoryItf') private readonly farmsRepository: FarmsRepositoryItf){}
  
  async getAllLivestock(query?: Condition): Promise<Livestock[]> {
    const allLivestock: Livestock[] = await this.livestocksRepository.getAll(query);
    return allLivestock
  };

  async getOneLivestock(id: number): Promise<Livestock> {
    const oneLivestock: Livestock | undefined = await this.livestocksRepository.getOne(id);
    if(!oneLivestock) throw new LivestockNotFoundException();
    return oneLivestock;
  };

  async createdLivestock(newLive: ServiceCreateLivestock): Promise<Livestock> {
    const findFarm: Farms | undefined = await this.farmsRepository.getFarmByUserId(newLive.user_id);
    if(!findFarm) throw new FarmNotFoundException('you not create farm');
    const newLivestock: Livestock = await this.livestocksRepository.created({
      farm_id: findFarm.id,
      body: newLive.body
    });
    // check input image
    if(newLive.body.img_livestock) await this.livestocksRepository.createManyImg({
      livestock_id: newLivestock.id,
      body: newLive.body.img_livestock
    });
    return newLivestock;
  }

  // async updatedLivestock(upLive: ServiceUpdateLivestock): Promise<Livestock> {
  //   const findLivestock: OutDetailLivestock | undefined = await this.livestocksRepository.getOne(upLive.id);
  //   if(!findLivestock) throw new LivestockNotFoundException();
  //   if(findLivestock.farm.user_id !== upLive.user_id) throw new LivestockAccessException();

  //   if(upLive.body.img_livestock){
  //     const oldImg: string[] = findLivestock.img_livestock.map(img => img.url);
  //     const imgInputRaw: string[] = upLive.body.img_livestock;

  //     const newImg: string[] = imgInputRaw.filter(url => !oldImg.includes(url));
  //     const deleteImg: string[] = oldImg.filter(url => !imgInputRaw.includes(url));
  //     if(deleteImg.length > 0) await this.livestocksRepository.deleteManyImg(deleteImg);
  //     if(newImg.length > 0) await this.livestocksRepository.createManyImg({
  //       livestock_id: upLive.id,
  //       body: newImg
  //     });
  //   };
  //   const updateLive: Livestock = await this.livestocksRepository.updated(upLive);
  //   return updateLive;
  // }

  async deletedLivestock(livestock: DeleteLivestock): Promise<Livestock> {
    const checkAccess: OutRelationLivestock | undefined = await this.livestocksRepository.getRelationLivestock(livestock.id);
    if(!checkAccess) throw new LivestockNotFoundException();
    if(checkAccess.farm.user_id !== livestock.user_id) throw new LivestockAccessException();

    const deleteLivestock: Livestock = await this.livestocksRepository.deleted(livestock.id);
    return deleteLivestock;
  }

  async updateLivestockPros(updateDat: UpdateDatLivestockService): Promise<Livestock> {
    const findLivestock: OutDetailLivestock | undefined = await this.livestocksRepository.getOne(updateDat.livestock_id);
    if(!findLivestock) throw new LivestockNotFoundException();
    if(findLivestock.farm.user_id !== updateDat.user_id) throw new LivestockAccessException();
    const updateLivestock = await this.livestocksRepository.updateLivestockPros(updateDat);
    return updateLivestock;
  }
}