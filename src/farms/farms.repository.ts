import { Injectable } from "@nestjs/common";
import { BuildingFarm, FarmsRepositoryItf, UpdateFarm } from "./farms.repository.interface";
import { PrismaService } from "prisma/prisma.service";
import { Farms } from "@prisma/client";
import { Condition } from "../global/entities/condition-entity";
import { handlePrismaError } from "src/global/utils/prisma.error.util";

@Injectable()
export class FarmsRepository implements FarmsRepositoryItf {
    constructor(private readonly prisma: PrismaService){}

    async getAll(query?: Condition): Promise<Farms[] | undefined> {
        try {
            const where: Condition = {};
            if(query?.name || query?.location || query?.rating) {
                where.OR = [];
                if(query.name) where.OR.push({ name: query.name });
                if(query.location) where.OR.push({ location: query.location });
                if(query.rating) where.OR.push({ rating: query.rating });
            };
            const allFarms: Farms[] = await this.prisma.farms.findMany({ where });
            if(allFarms.length < 1) return undefined;
            return allFarms;
        } catch (error) {
            handlePrismaError(error);
        }
    };

    async getFarm(id: number): Promise<Farms | undefined> {
        try {
            const farm: Farms | null = await this.prisma.farms.findUnique({
                where: { id }
            });
            if(farm === null) return undefined;
            return farm;
        } catch (error) {
            handlePrismaError(error);
        }
    };

    async getShelterFarm(id: number): Promise<Farms | undefined> {
        try {
            const farm: Farms | null = await this.prisma.farms.findUnique({
                where: { id },
                include: {shelters: {
                    include: { 
                        care_give: true,
                        transaction: {
                            select: {
                                start_date: true,
                                finish_date: true,
                                total_livestock: true
                            }
                        },
                        img_shelter: true
                    }
                }}
            });
            if(farm === null) return undefined;
            return farm;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async getFarmByUserId(user_id: number): Promise<Farms | undefined> {
        try {
            const farm: Farms | null = await this.prisma.farms.findUnique({
                where: { user_id }
            });
            if(farm === null) return undefined;
            return farm;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async created(farm: BuildingFarm): Promise<Farms> {
        try {
            const createFarm: Farms = await this.prisma.farms.create({
                data: {
                    user_id: farm.user_id,
                    name: farm.body.name,
                    location: farm.body.location,
                    img_farm: farm.body.img_farm,
                }
            });
            return createFarm;
        } catch (error) {
            handlePrismaError(error);
        }
    };

    async updated(farm: UpdateFarm): Promise<Farms> {
        try {
            const updateFarm: Farms = await this.prisma.farms.update({
                where: { user_id: farm.id },
                data: {
                    name: farm.body.name,
                    location: farm.body.location,
                    img_farm: farm.body.img_farm,
                    updated_at: new Date()
                }
            });
            return updateFarm;
        } catch (error) {
            handlePrismaError(error);
        }
    };

    async updatedByAdmin(farm: UpdateFarm): Promise<Farms> {
        try {
            const updateFarm: Farms = await this.prisma.farms.update({
                where: { id: farm.id },
                data: {
                    name: farm.body.name,
                    location: farm.body.location,
                    img_farm: farm.body.img_farm,
                    updated_at: new Date()
                }
            });
            return updateFarm;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async deleted(id: number): Promise<Farms> {
        try {
            const deleteFarm: Farms = await this.prisma.farms.delete({ where: { id } });
            return deleteFarm;
        } catch (error) {
            handlePrismaError(error);
        }
    };
}