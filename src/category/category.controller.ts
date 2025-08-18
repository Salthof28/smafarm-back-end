import { Body, Controller, Delete, Get, Inject, InternalServerErrorException, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryServiceItf } from './category.service.interface';
import { Category } from '@prisma/client';
import { CustomExceptionGen } from '../global/exception/exception.general';
import { JwtAuthGuard } from '../global/guards/jwt-auth.guard';
import { Roles } from '../global/decorator/roles.decorator';
import { RolesGuard } from '../global/guards/roles.guard';
import { Role } from '../global/enum/role.enum';
import { CreateCategoryDto } from './dto/req/create-category.dto';
import { UpdateCategoryDto } from './dto/req/update-category.dto';
import { TransformRes } from '../global/interceptors/transform-body-res.interceptor';
import { CategoryBodyDto } from './dto/res/category-body.dto';

@Controller('category')
@TransformRes(CategoryBodyDto)
export class CategoryController {
  constructor(@Inject('CategoryServiceItf') private readonly categoryService: CategoryServiceItf) {}

  @Get()
  async getAllCat(): Promise<Category[]> {
    try {
      const allCat: Category[] = await this.categoryService.getAllCat();
      return allCat;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Post()
  async createdCat(@Body() body: CreateCategoryDto): Promise<Category> {
    try {
      const createCat: Category = await this.categoryService.createdCat(body);
      return createCat;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  @Get(':id')
  async getCat(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    try {
      const cat: Category = await this.categoryService.getCat(id);
      return cat;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updatedCat(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCategoryDto): Promise<Category> {
    try {
      const updateCat: Category = await this.categoryService.updatedCat({
        id,
        body
      });
      return updateCat;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  };

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletedCat(@Param('id', ParseIntPipe) id: number): Promise<Category> {
    try {
      const deleteCat: Category = await this.categoryService.deletedCat(id);
      return deleteCat;
    } catch (error) {
      if(error instanceof CustomExceptionGen) throw error;
      throw new InternalServerErrorException()
    }
  }
}
