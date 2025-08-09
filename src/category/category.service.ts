import { Inject, Injectable } from '@nestjs/common';
import { CategoryServiceItf } from './category.service.interface';
import { CategoryRepositoryItf } from './category.repository.interface';

@Injectable()
export class CategoryService implements CategoryServiceItf {
  constructor(@Inject('CategoryRepositoryItf') private readonly categoryRepository: CategoryRepositoryItf) {}
  
}
