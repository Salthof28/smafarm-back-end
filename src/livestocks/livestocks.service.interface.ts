import { Livestock } from "@prisma/client";
import { Condition } from "../global/entities/condition-entity";
import { CreateLivestockDto } from "./dto/req/create-livestock.dto";
import { UpdateLivestockDto } from "./dto/req/update-livestock.dto";

export interface LivestocksServiceItf {
    getAllLivestock(query?: Condition): Promise<Livestock[]>;
    getOneLivestock(id: number): Promise<Livestock>;
    createdLivestock(newLive: ServiceCreateLivestock): Promise<Livestock>;
    updatedLivestock(upLive: ServiceUpdateLivestock): Promise<Livestock>;
    deletedLivestock(livestock: DeleteLivestock): Promise<Livestock>; 
}

export interface ServiceCreateLivestock {
    user_id: number,
    body: CreateLivestockDto,
}

export interface ServiceUpdateLivestock {
    id: number,
    user_id: number,
    body: UpdateLivestockDto
}

export interface DeleteLivestock {
    user_id: number,
    id: number
}