import { Category } from "@prisma/client";
import { CreateCategoryDto } from "./dto/req/create-category.dto";
import { UpdateCategoryDto } from "./dto/req/update-category.dto";

export interface CategoryServiceItf {
    getAllCat(): Promise<Category[]>;
    getCat(id: number): Promise<Category>;
    createdCat(body: CreateCategoryDto): Promise<Category>;
    updatedCat(cat: UpdatedCat): Promise<Category>;
    deletedCat(id: number): Promise<Category>;
}

export interface UpdatedCat {
    id: number,
    body: UpdateCategoryDto
}