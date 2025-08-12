import { Injectable } from "@nestjs/common";
import { NewImageUrl, NewShelter, OutDetailShelter, SheltersRepositoryItf, UpdateCare, UpdateShelter } from "./shelters.repository.interface";
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
            if(query?.name || query?.location || query?.category_id){
                where.OR = [];
                if(query.name) where.OR.push({ name: query.name });
                if(query.location) where.OR.push({ location: query.location });
                if(query.category_id) where.OR.push({ category_id: query.category_id });
            }
            
            const allShelter: Shelter[] = await this.prisma.shelter.findMany({ where });
            if(allShelter.length < 1) return undefined;
            return allShelter;
        } catch (error) {
            handlePrismaError(error);
        }
    };

    async getShelter(id: number): Promise<OutDetailShelter | undefined> {
        try {
            const shelter: OutDetailShelter | null = await this.prisma.shelter.findUnique({
                where: { id },
                include: { 
                    img_shelter: { select: { url: true } },
                    farm: { select: { user_id: true } },
                    care_give: true,
                }
            });
            if(shelter === null) return undefined;
            return shelter;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async getRelationShelter(id: number): Promise<{ farm: { user_id: number } } | undefined> {
        try {
            const shelter: { farm: { user_id: number } } | null = await this.prisma.shelter.findUnique({
                where: { id },
                select: {
                    farm: {
                        select: { user_id: true }
                    }
                }
            });
            if(shelter === null) return undefined;
            return shelter;
        } catch (error) {
            handlePrismaError(error);
        }
    }
    
    async getAllCare(): Promise<CareGive[] | undefined> {
        try {
            const allCare: CareGive[] = await this.prisma.careGive.findMany();
            if(allCare.length < 1) return undefined;
            return allCare
        } catch (error) {
            handlePrismaError(error);
        }
    };

    async getRelationCare(id: number): Promise<{ shelter: { farm: { user_id: number } } } | undefined> {
        try {
            const care = await await this.prisma.careGive.findUnique({
                where: { id },
                select: {
                    shelter: {
                        select: {
                            farm: {
                                select: { user_id: true }
                            }
                        }
                    }
                }
            });
            if(care === null) return undefined;
            return care;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async createdShelter(newShel: NewShelter): Promise<Shelter> {
        try {
            const newShelter: Shelter = await this.prisma.shelter.create({
                data: {
                    farm_id: newShel.farm_id,
                    category_id:newShel.body.category_id,
                    name: newShel.body.name,
                    location: newShel.body.location,
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
                    accomodate: upShel.body.accomodate,
                    description: upShel.body.description,
                    price_daily: upShel.body.price_daily,
                    updated_at: new Date()
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
    };

    async createManyImg(allUrl: NewImageUrl): Promise<number> {
        try {
            const { count } = await this.prisma.imgShelter.createMany({
                data: allUrl.body.map(imgUrl => ({
                    shelter_id: allUrl.shelter_id,
                    url: imgUrl
                }))
            });
            return count;
        } catch (error) {
            handlePrismaError(error);
        }        
    };

    async deleteManyImg(allUrl: string[]): Promise<number> {
        try {
            const { count } = await this.prisma.imgShelter.deleteMany({
                where: {
                    url: {
                        in: allUrl.map(url => url)
                    }
                }
            })
            return count;
        } catch (error) {
            handlePrismaError(error);
        }            
    }
}