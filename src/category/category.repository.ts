import { Injectable } from "@nestjs/common";
import { CategoryRepositoryItf } from "./category.repository.interface";

@Injectable()
export class CategoryRepository implements CategoryRepositoryItf {

}