import { Condition } from "../global/entities/condition-entity";
import { CreateFarmDto } from "./dto/req/create-farm.dto";
import { UpdateFarmDto } from "./dto/req/update-farm.dto";
import { Farms } from "@prisma/client";

export interface FarmsServiceItf {
    getAllFarms(query?: Condition): Promise<Farms[]>;
    getFarm(id: number): Promise<Farms>;
    getSheltersFarm(id: number): Promise<Farms>;
    createdFarm(farm: BuildFarm): Promise<Farms>;
    updatedFarm(farm: UpdateFarm): Promise<Farms>;
    updatedFarmByAdmin(farm: UpdateFarm): Promise<Farms>;
    deletedFarm(id: number): Promise<Farms>;
}


export interface BuildFarm {
    user_id: number,
    body: CreateFarmDto
}
export interface UpdateFarm {
    id: number,
    body: UpdateFarmDto
}