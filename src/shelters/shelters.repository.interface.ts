import { CareGive, Prisma, Shelter } from "@prisma/client";
import { Condition } from "../global/entities/condition-entity";
import { CreateCareDto } from "./dto/req/create-care.dto";
import { CreateShelterDto } from "./dto/req/create-shelter.dto";
import { UpdateShelterDto } from "./dto/req/update-shelter.dto";
import { UpdateCareDto } from "./dto/req/update-care.dto";

export interface SheltersRepositoryItf {
    getAllShelter(query?: Condition): Promise<Shelter[] | undefined>;
    getShelter(id: number): Promise<OutDetailShelter | undefined>;
    getRelationShelter(id: number): Promise<{ farm: { user_id: number } } | undefined>;
    getAllCare(id?: number[]): Promise<OutCareShelter[] | undefined>;
    getRelationCare(id: number): Promise<{ shelter: { farm: { user_id: number } } } | undefined>;
    createdShelter(newShel: NewShelter): Promise<Shelter>;
    updatedShelter(upShel: UpdateShelter): Promise<Shelter>;
    deletedShelter(id: number): Promise<Shelter>;
    createManyImg(allUrl: NewImageUrl): Promise<number>;
    deleteManyImg(allUrl: string[]): Promise<number>;
    createdCare(body: CreateCareDto): Promise<CareGive>;
    updatedCare(upCare: UpdateCare): Promise<CareGive>;
    deletedCare(id: number): Promise<CareGive>;
    getAllAccomodateShelter(id_shelter: number[]): Promise<OutAccomodate[]>;
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

export interface NewImageUrl {
    shelter_id: number,
    body: string[]
}

export type OutDetailShelter = (Shelter & { img_shelter: { url: string }[], farm: { user_id: number }, care_give: CareGive[] })

export type OutAccomodate = { id: number, accomodate: number };

export type OutCareShelter = (CareGive & { shelter: { id: number, price_daily: Prisma.Decimal } });