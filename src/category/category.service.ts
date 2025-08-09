import { BadGatewayException, Inject, Injectable } from '@nestjs/common';
import { CategoryServiceItf, UpdatedCat } from './category.service.interface';
import { CategoryRepositoryItf } from './category.repository.interface';
import { Category } from '@prisma/client';
import { CategoryNotFoundException } from './exceptions/category-not-found-exception';
import { CreateCategoryDto } from './dto/req/create-category.dto';

@Injectable()
export class CategoryService implements CategoryServiceItf {
  constructor(@Inject('CategoryRepositoryItf') private readonly categoryRepository: CategoryRepositoryItf) {}

  async getAllCat(): Promise<Category[]> {
    const allCat: Category[] | undefined = await this.categoryRepository.getAll();
    if(!allCat) throw new CategoryNotFoundException();
    return allCat;
  };

  async getCat(id: number): Promise<Category> {
    const cat: Category | undefined = await this.categoryRepository.getCat(id);
    if(!cat) throw new CategoryNotFoundException();
    return cat;
  };

  async createdCat(body: CreateCategoryDto): Promise<Category> {
    const newCat: Category = await this.categoryRepository.created(body);
    return newCat;
  };

  async updatedCat(cat: UpdatedCat): Promise<Category> {
    const updateCat: Category = await this.categoryRepository.updated(cat);
    return updateCat;
  };

  async deletedCat(id: number): Promise<Category> {
    const deleteCat: Category = await this.categoryRepository.deleted(id);
    return deleteCat;
  }
}
