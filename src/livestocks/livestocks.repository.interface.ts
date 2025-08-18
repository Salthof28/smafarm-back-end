import { Livestock } from "@prisma/client";
import { Condition } from "src/global/entities/condition-entity";
import { CreateLivestockDto } from "./dto/req/create-livestock.dto";
import { UpdateLivestockDto } from "./dto/req/update-livestock.dto";

export interface LivestocksRepositoryItf {
    getAll(query?:Condition): Promise<Livestock[]>;
    getOne(id: number): Promise<OutDetailLivestock | undefined>;
    getRelationLivestock(id: number): Promise<OutRelationLivestock | undefined>;
    created(newLive: NewLivestock): Promise<Livestock>;
    updated(upLive: UpdateLivestock): Promise<Livestock>;
    deleted(id: number): Promise<Livestock>;
    createManyImg(allUrl: NewImgUrlLive): Promise<number>;
    deleteManyImg(allUrl: string[]): Promise<number>;
    getAllLiveTransaction(id: number[]): Promise<Livestock[] | undefined>;
}

export type OutDetailLivestock = (Livestock & { img_livestock: { url:string }[], farm: { user_id: number } });

export type OutRelationLivestock = { farm: { user_id: number } };

export interface NewLivestock {
    farm_id: number,
    body: CreateLivestockDto
}

export interface UpdateLivestock {
    id: number,
    body: UpdateLivestockDto
}

export interface NewImgUrlLive {
    livestock_id: number,
    body: string[]
}