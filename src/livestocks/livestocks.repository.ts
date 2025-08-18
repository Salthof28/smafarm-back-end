import { Injectable } from "@nestjs/common";
import { LivestocksRepositoryItf, NewImgUrlLive, NewLivestock, OutDetailLivestock, OutRelationLivestock, UpdateLivestock } from "./livestocks.repository.interface";
import { PrismaService } from "prisma/prisma.service";
import { Livestock } from "@prisma/client";
import { Condition } from "../global/entities/condition-entity";
import { handlePrismaError } from "../global/utils/prisma.error.util";

@Injectable()
export class LivestocksRepository implements LivestocksRepositoryItf {
    constructor(private readonly prisma: PrismaService){}
    
    async getAll(query?: Condition): Promise<Livestock[]> {
        try {
            const where: Condition = {}
            if(query?.low_price && query?.high_price) where.price = {
                gte: query.low_price,
                lte: query.high_price,
            };
            else if(query?.low_price && !query?.high_price) where.price = {
                gte: query.low_price,
            };
            else if(!query?.low_price && query?.high_price) where.price = {
                lte: query.high_price,
            };
            // where or
            if(query?.name || query?.location || query?.category_id){
                where.OR = [];
                if(query.name) where.OR.push({ name: query.name });
                if(query.location) where.OR.push({ location: query.location });
                if(query.category_id) where.OR.push({ category_id: query.category_id });
            }
            
            const allShelter: Livestock[] = await this.prisma.livestock.findMany({
                where,
                include: { 
                    category: true,
                    img_livestock: {
                        select: { url: true }
                    },
                    
                }
            });
            return allShelter;
        } catch (error) {
            handlePrismaError(error);
        }        
    }

    async getOne(id: number): Promise<OutDetailLivestock | undefined> {
        try {
            const livestock: OutDetailLivestock | null = await this.prisma.livestock.findUnique({
                where: { id },
                include: {
                    img_livestock: { select: { url: true } },
                    farm: { select: { user_id: true } }
                }
            });
            if(livestock === null) return undefined;
            return livestock;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async getRelationLivestock(id: number): Promise<OutRelationLivestock | undefined> {
        try {
            const livestock: OutRelationLivestock | null = await this.prisma.livestock.findUnique({
                where: { id },
                select: {
                    farm: {
                        select: { user_id: true }
                    }
                }
            });
            if(livestock === null) return undefined;
            return livestock;
        } catch (error) {
            handlePrismaError(error);
        }        
    };

    async created(newLive: NewLivestock): Promise<Livestock> {
        try {
            const newLivestock: Livestock = await this.prisma.livestock.create({
                data: {
                    farm_id: newLive.farm_id,
                    category_id: newLive.body.category_id,
                    name: newLive.body.name,
                    age: newLive.body.age,
                    price: newLive.body.price,
                    stock: newLive.body.stock,
                    description: newLive.body.description,
                    location: newLive.body.location,
                }
            });
            return newLivestock
        } catch (error) {
            handlePrismaError(error);
        }           
    }

    async updated(upLive: UpdateLivestock): Promise<Livestock> {
        try {
            const updateLivestock: Livestock = await this.prisma.livestock.update({
                where: { id: upLive.id },
                data: {
                    name: upLive.body.name,
                    age: upLive.body.age,
                    price: upLive.body.price,
                    stock: upLive.body.stock,
                    description: upLive.body.description,
                    location: upLive.body.location,
                }
            });
            return updateLivestock
        } catch (error) {
            handlePrismaError(error);
        }          
    }

    async deleted(id: number): Promise<Livestock> {
        try {
            const deleteLive: Livestock = await this.prisma.livestock.delete({
                where: { id }
            });
            return deleteLive;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async createManyImg(allUrl: NewImgUrlLive): Promise<number> {
        try {
            const { count } = await this.prisma.imgLivestocks.createMany({
                data: allUrl.body.map(imgUrl => ({
                    livestock_id: allUrl.livestock_id,
                    url: imgUrl
                }))
            });
            return count;
        } catch (error) {
            handlePrismaError(error);
        }          
    }

    async deleteManyImg(allUrl: string[]): Promise<number> {
        try {
            const { count } = await this.prisma.imgLivestocks.deleteMany({
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

    async getAllLiveTransaction(id: number[]): Promise<Livestock[] | undefined> {
        try {
            const where: any = {};
            if(id) where.id = { in: id };
            const allLivestock: Livestock[] = await this.prisma.livestock.findMany({ where });
            if(allLivestock.length < 1) return undefined;
            return allLivestock;    
        } catch (error) {
            handlePrismaError(error);
        }          
    }
    
}