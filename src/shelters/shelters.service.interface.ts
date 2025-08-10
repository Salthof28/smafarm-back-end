import { CareGive, Shelter } from "@prisma/client";
import { Condition } from "../global/entities/condition-entity";
import { CreateCareDto } from "./dto/req/create-care.dto";
import { CreateShelterDto } from "./dto/req/create-shelter.dto";
import { UpdateCare, UpdateShelter } from "./shelters.repository.interface";
import { UpdateShelterDto } from "./dto/req/update-shelter.dto";
import { UpdateCareDto } from "./dto/req/update-care.dto";

export interface SheltersServiceItf {
    getAllShelters(query?: Condition): Promise<Shelter[]>;
    getShelter(id: number): Promise<Shelter>;
    getAllCares(): Promise<CareGive[]>;
    createdShelter(newShel: ServiceCreateShelter): Promise<Shelter>;
    updatedShelter(upShel: ServiceUpdateShelter): Promise<Shelter>;
    deletedShelter(shelter: DeleteShelter): Promise<Shelter>;
    createdCare(care: ServiceCreateCare): Promise<CareGive>;
    updatedCare(upCare: ServiceUpdateCare): Promise<CareGive>;
    deletedCare(care: DeleteCare): Promise<CareGive>;
}

export interface ServiceCreateShelter {
    user_id: number,
    body: CreateShelterDto,
}
export interface ServiceCreateCare {
    user_id: number,
    body: CreateCareDto,
}

export interface ServiceUpdateShelter {
    id: number,
    user_id: number,
    body: UpdateShelterDto
}

export interface ServiceUpdateCare {
    id: number,
    user_id: number,
    body: UpdateCareDto
}

export interface DeleteShelter {
    user_id: number,
    id: number
}

export interface DeleteCare {
    user_id: number,
    id: number
}