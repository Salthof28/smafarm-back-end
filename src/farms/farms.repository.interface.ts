import { Farms } from "@prisma/client";
import { Condition } from "../global/entities/condition-entity";
import { CreateFarmDto } from "./dto/req/create-farm.dto";
import { UpdateFarmDto } from "./dto/req/update-farm.dto";

export interface FarmsRepositoryItf {
    getAll(query?: Condition): Promise<Farms[] | undefined>;
    getFarm(id: number): Promise<Farms | undefined>;
    getFarmByUserId(user_id: number): Promise<Farms | undefined>;
    created(farm: BuildingFarm): Promise<Farms>;
    updated(farm: UpdateFarm): Promise<Farms>;
    updatedByAdmin(farm: UpdateFarm): Promise<Farms>;
    deleted(id: number): Promise<Farms>;
}

export interface BuildingFarm {
    user_id: number,
    body: CreateFarmDto
}
export interface UpdateFarm {
    id: number,
    body: UpdateFarmDto
}
