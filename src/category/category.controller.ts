import { Controller, Inject } from '@nestjs/common';
import { CategoryServiceItf } from './category.service.interface';

@Controller('category')
export class CategoryController {
  constructor(@Inject('CategoryServiceItf') categoryService: CategoryServiceItf) {}

}
