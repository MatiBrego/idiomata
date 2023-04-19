import { PrismaClient } from "@prisma/client";
import { CategoryDto, CategoryInputDto } from "./category.dto";

export class CategoryRepository{
    
    constructor(private readonly db:PrismaClient){}

    async create(category: CategoryInputDto): Promise<CategoryDto>{
        const categoryResult = await this.db.category.create({
            data:category
        })
        return categoryResult;
    }

    async delete(categoryName: string): Promise<void>{
        await this.db.category.delete({
            where:{
                name:categoryName
            }
        })
    }

    async modify(categoryName:string, newCategoryName:string):Promise<void>{
        await this.db.category.update({
            where:{
                name: categoryName
            },
            data:{
                name:newCategoryName
            }
        })
    }

    async getAll():Promise<String[]>{
        const categories = await this.db.category.findMany({});
        return categories.map((json)=>{return json.name});
    }




}