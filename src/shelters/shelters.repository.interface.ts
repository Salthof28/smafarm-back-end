import { CareGive, Shelter } from "@prisma/client";
import { Condition } from "src/global/entities/condition-entity";
import { CreateCareDto } from "./dto/req/create-care.dto";
import { CreateShelterDto } from "./dto/req/create-shelter.dto";
import { UpdateShelterDto } from "./dto/req/update-shelter.dto";
import { UpdateCareDto } from "./dto/req/update-care.dto";

export interface SheltersRepositoryItf {
    getAllShelter(query?: Condition): Promise<Shelter[] | undefined>;
    getShelter(id: number): Promise<Shelter | undefined>;
    getAllCare(): Promise<CareGive[] | undefined>;
    createdShelter(newShel: NewShelter): Promise<Shelter>;
    updatedShelter(upShel: UpdateShelter): Promise<Shelter>;
    deletedShelter(id: number): Promise<Shelter>;
    createdCare(body: CreateCareDto): Promise<CareGive>;
    updatedCare(upCare: UpdateCare): Promise<CareGive>;
    deletedCare(id: number): Promise<CareGive>;
}

export interface UpdateShelter {
    id: number,
    body: UpdateShelterDto
}
export interface UpdateCare {
    id: number,
    body: UpdateCareDto
}
export interface NewShelter {
    farm_id: number,
    body: CreateShelterDto
}