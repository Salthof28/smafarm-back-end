import { Inject, Injectable } from '@nestjs/common';
import { DeleteCare, DeleteShelter, ServiceCreateCare, ServiceCreateShelter, ServiceUpdateCare, ServiceUpdateShelter, SheltersServiceItf } from './shelters.service.interface';
import { OutDetailShelter, SheltersRepositoryItf } from './shelters.repository.interface';
import { CareGive, Farms, Shelter } from '@prisma/client';
import { Condition } from '../global/entities/condition-entity';
import { ShelterNotFoundException } from './exception/shelter-not-found-exception';
import { CareNotFoundException } from './exception/care-not-found-exception';
import { FarmsRepositoryItf } from '../farms/farms.repository.interface';
import { FarmNotFoundException } from '../farms/exception/farm-not-found-exception';
import { ShelterAccessException } from './exception/shelter-access-exception';


@Injectable()
export class SheltersService implements SheltersServiceItf {
  constructor(@Inject('SheltersRepositoryItf') private readonly sheltersRepository: SheltersRepositoryItf, @Inject('FarmsRepositoryItf') private readonly farmsRepository: FarmsRepositoryItf){}
  
  async getAllShelters(query?: Condition): Promise<Shelter[]> {
    const allShelters: Shelter[] | undefined = await this.sheltersRepository.getAllShelter(query);
    if(!allShelters) throw new ShelterNotFoundException()
    return allShelters;
  };

  async getShelter(id: number): Promise<Shelter> {
    const shelter: Shelter | undefined = await this.sheltersRepository.getShelter(id);
    if(!shelter) throw new ShelterNotFoundException();
    return shelter;
  };

  async getAllCares(): Promise<CareGive[]> {
    const allCare: CareGive[] | undefined = await this.sheltersRepository.getAllCare();
    if(!allCare) throw new CareNotFoundException();
    return allCare;
  }

  async createdShelter(newShel: ServiceCreateShelter): Promise<Shelter> {
    const findFarm: Farms | undefined = await this.farmsRepository.getFarmByUserId(newShel.user_id);
    if(!findFarm) throw new FarmNotFoundException('you not create farm');
    const newShelter: Shelter = await this.sheltersRepository.createdShelter({
      farm_id: findFarm.id,
      body: newShel.body
    });
    // check input image or not
    if(newShel.body.img_shelter) await this.sheltersRepository.createManyImg({
        shelter_id: newShelter.id,
        body: newShel.body.img_shelter
      });
    return newShelter;
  };

  async updatedShelter(upShel: ServiceUpdateShelter): Promise<Shelter> {
    // check shelter has a user
    const findShelter: OutDetailShelter | undefined = await this.sheltersRepository.getShelter(upShel.id);
    if(!findShelter) throw new ShelterNotFoundException();
    if(findShelter.farm.user_id !== upShel.user_id) throw new ShelterAccessException();
    // check the user input image shelter. If input create the image
    if(upShel.body.img_shelter){
      // old only (from database)
      const oldImg: string[] = findShelter.img_shelter.map(img => img.url);
      // all image (old & new from input request)
      const imgInputRaw: string[] = upShel.body.img_shelter;
      // filter new image
      const newImg: string[] = imgInputRaw.filter(url => !oldImg.includes(url));
      // filter delete image
      const deleteImg: string[] = oldImg.filter(url => !imgInputRaw.includes(url));
      if(deleteImg.length > 0) await this.sheltersRepository.deleteManyImg(deleteImg);
      if(newImg.length > 0) await this.sheltersRepository.createManyImg({
        shelter_id: upShel.id,
        body: newImg
      })
    }
    // update shelter
    const upShelter: Shelter = await this.sheltersRepository.updatedShelter(upShel);
    return upShelter;
  }

  async deletedShelter(shelter: DeleteShelter): Promise<Shelter> {
    // check shelter has a user
    const checkShelter: { farm: { user_id: number } } | undefined = await this.sheltersRepository.getRelationShelter(shelter.id);
    if(!checkShelter) throw new ShelterNotFoundException();
    if(checkShelter.farm.user_id !== shelter.user_id) throw new ShelterAccessException();
    // delete shelter
    const deleteShelter: Shelter = await this.sheltersRepository.deletedShelter(shelter.id);
    return deleteShelter;
  }

  async createdCare(care: ServiceCreateCare): Promise<CareGive> {
    // check shelter has a user
    const checkShelter: { farm: { user_id: number } } | undefined = await this.sheltersRepository.getRelationShelter(care.body.shelter_id);
    if(!checkShelter) throw new ShelterNotFoundException();
    if(checkShelter.farm.user_id !== care.user_id) throw new ShelterAccessException();
    // create new care
    const newCare = await this.sheltersRepository.createdCare(care.body);
    return newCare;
  }

  async updatedCare(upCare: ServiceUpdateCare): Promise<CareGive> {
    // check care has a user
    const checkCare: { shelter: { farm: { user_id: number } } } | undefined = await this.sheltersRepository.getRelationCare(upCare.id);
    if(!checkCare) throw new CareNotFoundException();
    if(checkCare.shelter.farm.user_id !== upCare.user_id) throw new ShelterAccessException();
    // update care
    const updateCare: CareGive = await this.sheltersRepository.updatedCare(upCare);
    return updateCare;
  }

  async deletedCare(care: DeleteCare): Promise<CareGive> {
    // check care has a user
    const checkCare: { shelter: { farm: { user_id: number } } } | undefined = await this.sheltersRepository.getRelationCare(care.id);
    if(!checkCare) throw new CareNotFoundException();
    if(checkCare.shelter.farm.user_id !== care.user_id) throw new ShelterAccessException();
    // delete care
    const deleteCare: CareGive = await this.sheltersRepository.deletedCare(care.id);
    return deleteCare;
  }
}
