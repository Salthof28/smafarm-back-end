import { Injectable } from "@nestjs/common";
import { CategoryRepositoryItf, UpdateCat } from "./category.repository.interface";
import { PrismaService } from "prisma/prisma.service";
import { Category } from "@prisma/client";
import { CreateCategoryDto } from "./dto/req/create-category.dto";
import { handlePrismaError } from "../global/utils/prisma.error.util";

@Injectable()
export class CategoryRepository implements CategoryRepositoryItf {
    constructor(private readonly prisma: PrismaService){}

    async getAll(): Promise<Category[] | undefined> {
        try {
            const allCat: Category[] = await this.prisma.category.findMany({});
            if(allCat.length < 1) return undefined;
            return allCat;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async getCat(id: number): Promise<Category | undefined> {
        try {
            const cat: Category | null = await this.prisma.category.findUnique({ 
                where: {
                    id
                }
             });
            if(cat === null) return undefined;
            return cat;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async created(body: CreateCategoryDto): Promise<Category> {
        try {
            const newCat: Category = await this.prisma.category.create({
                data: {
                    name: body.name,
                    img_category: 'no image'
                }
            });
            return newCat
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async updated(cat: UpdateCat): Promise<Category> {
        try {
            const updateCat: Category = await this.prisma.category.update({
                where: { id: cat.id },
                data: {
                    name: cat.body.name,
                    img_category: cat.body.img_category,
                    updated_at: new Date()
                }
            });
            return updateCat;
        } catch (error) {
            handlePrismaError(error);
        }
    }

    async deleted(id: number): Promise<Category> {
        try {
            const deleteCat: Category = await this.prisma.category.delete({
                where: {
                    id
                }
            });
            return deleteCat;
        } catch (error) {
            handlePrismaError(error);
        }
    }
}