import { CareGive, Shelter } from "@prisma/client";
import { Condition } from "src/global/entities/condition-entity";
import { CreateCareDto } from "./dto/req/create-care.dto";

export interface SheltersServiceItf {
    getAllShelters(query?: Condition): Promise<Shelter[]>;
    getShelter(id: number): Promise<Shelter>;
    getAllCares(): Promise<CareGive[]>;
    // createdShelter(newShel: NewShelter): Promise<Shelter>;
    // updatedShelter(upShel: UpdateShelter): Promise<Shelter>;
    deletedShelter(id: number): Promise<Shelter>;
    createdCare(body: CreateCareDto): Promise<CareGive>;
    // updatedCare(upCare: UpdateCare): Promise<CareGive>;
    deletedCare(id: number): Promise<CareGive>;
}