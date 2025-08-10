import { Injectable } from "@nestjs/common";
import { NewShelter, SheltersRepositoryItf, UpdateCare, UpdateShelter } from "./shelters.repository.interface";
import { PrismaService } from "prisma/prisma.service";
import { handlePrismaError } from "../global/utils/prisma.error.util";
import { Condition } from "../global/entities/condition-entity";
import { CareGive, Shelter } from "@prisma/client";
import { CreateCareDto } from "./dto/req/create-care.dto";

@Injectable()
export class SheltersRepository implements SheltersRepositoryItf {
    constructor(private readonly prisma: PrismaService){}

    async getAllShelter(query?: Condition): Promise<Shelter[] | undefined> {
        try {
            const where: Condition = {}
            if(query?.low_price && query?.high_price) where.price_daily = {
                gte: query.low_price,
                lte: query.high_price,
            };
            else if(query?.low_price && !query?.high_price) where.price_daily = {
                gte: query.low_price,
            };
            else if(!query?.low_price && query?.high_price) where.price_daily = {
                lte: query.high_price,
            };
            // where or
            where.OR = [];
            if(query?.name) where.OR.push({ name: query.name });
            if(query?.location) where.OR.push({ location: query.location });
            if(query?.category) where.OR.push({ category: query.category });
            
            const allShelter: Shelter[] = await this.prisma.shelter.findMany({ where });
            if(allShelter.length < 1) return undefined;
            return allShelter;
        } catch (error) {
            handlePrismaError(error);
        }
    };

    async getShelter(id: number): Promise<Shelter | undefined> {
        try {
            const shelter: Shelter | null = await this.prisma.shelter.findUnique({
                where: { id }
            });
            if(shelter === null) return undefined;
            return shelter;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    
    async getAllCare(query?: Condition): Promise<CareGive[] | undefined> {
        try {
            const allCare: CareGive[] = await this.prisma.careGive.findMany();
            if(allCare.length < 1) return undefined;
            return allCare
        } catch (error) {
            handlePrismaError(error);
        }
    };

    async createdShelter(newShel: NewShelter): Promise<Shelter> {
        try {
            const newShelter: Shelter = await this.prisma.shelter.create({
                data: {
                    farm_id: newShel.farm_id,
                    category_id:newShel.body.category_id,
                    name: newShel.body.name,
                    location: newShel.body.location,
                    img_shelter: newShel.body.img_shelter,
                    accomodate: newShel.body.accomodate,
                    description: newShel.body.description,
                    price_daily: newShel.body.price_daily,
                }
            });
            return newShelter;
        } catch (error) {
            handlePrismaError(error);
        }
    };

    async updatedShelter(upShel: UpdateShelter): Promise<Shelter> {
        try {
            const upShelter: Shelter = await this.prisma.shelter.update({
                where: {
                    id: upShel.id
                },
                data: {
                    name: upShel.body.name,
                    location: upShel.body.location,
                    img_shelter: upShel.body.img_shelter,
                    accomodate: upShel.body.accomodate,
                    description: upShel.body.description,
                    price_daily: upShel.body.price_daily,
                }
            });
            return upShelter
        } catch (error) {
            handlePrismaError(error);
        }
    };

    async deletedShelter(id: number): Promise<Shelter> {
        try {
            const deleteShel: Shelter = await this.prisma.shelter.delete({
                where: { id }
            });
            return deleteShel;
        } catch (error) {
            handlePrismaError(error);
        }
    };

    async createdCare(body: CreateCareDto): Promise<CareGive> {
        try {
            const newCare: CareGive = await this.prisma.careGive.create({
                data: {
                    shelter_id: body.shelter_id,
                    name: body.name,
                    price: body.price,
                    unit: body.unit,
                    required: body.required
                }
            });
            return newCare
        } catch (error) {
            handlePrismaError(error);
        }
    };

    async updatedCare(upCare: UpdateCare): Promise<CareGive> {
        try {
            const updateCare: CareGive = await this.prisma.careGive.update({
                where: { id: upCare.id },
                data: {
                    shelter_id: upCare.body.shelter_id,
                    name: upCare.body.name,
                    price: upCare.body.price,
                    unit: upCare.body.unit,
                    required: upCare.body.required
                }
            });
            return updateCare;
        } catch (error) {
            handlePrismaError(error);
        }
    };

    async deletedCare(id: number): Promise<CareGive> {
        try {
            const deleteCare: CareGive = await this.prisma.careGive.delete({
                where: { id }
            });
            return deleteCare;
        } catch (error) {
            handlePrismaError(error);
        }
    }
}