import { CategoryDto, CategoryInputDto } from "./category.dto";
import { CategoryRepository } from "./category.repository";

export class CategoryService{

    constructor(private readonly repository:  CategoryRepository){}

    async createCategory(category: CategoryInputDto): Promise<CategoryDto>{
        return await this.repository.create(category);
    }

    async deleteCategory(categoryName: string): Promise<void>{
        return await this.repository.delete(categoryName);
    }

    async modifyCategory(categoryName: string, newCategoryName:string): Promise<void>{
        return await this.repository.modify(categoryName,newCategoryName);
    }






}