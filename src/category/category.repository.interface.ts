import { Category } from "@prisma/client";
import { CreateCategoryDto } from "./dto/req/create-category.dto";
import { UpdateCategoryDto } from "./dto/req/update-category.dto";

export interface CategoryRepositoryItf {
    getAll(): Promise<Category[] | undefined>;
    getCat(id: number): Promise<Category | undefined>;
    created(body: CreateCategoryDto): Promise<Category>;
    updated(cat: UpdateCat): Promise<Category>;
    deleted(id: number): Promise<Category>;
}

export interface UpdateCat {
    id: number,
    body: UpdateCategoryDto
}
