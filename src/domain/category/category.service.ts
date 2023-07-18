import { CategoryDto, CategoryInputDto } from "./category.dto";
import { CategoryRepository } from "./category.repository";
import fs from "fs";

export class CategoryService{

    constructor(private readonly repository:  CategoryRepository){}

    async createCategory(category: CategoryInputDto, file?: Express.Multer.File): Promise<CategoryDto>{
        if(file){
            fs.writeFile(__dirname+'/categoryImages/'+category.imgPath, file.buffer, (err) => {console.log(err)});
            const newCategory = {name: category.name, imgPath: "categoryImages/"+category.imgPath}
            return await this.repository.create(newCategory);
        }
        else{
            return await this.repository.create(category);
        }
    }

    async deleteCategory(categoryName: string): Promise<void>{
        return await this.repository.delete(categoryName);
    }

    async modifyCategory(categoryName: string, newCategoryName:string, newFile?: Express.Multer.File): Promise<void>{
        if(newFile){
            fs.writeFile(__dirname+'/categoryImages/'+newFile, newFile.buffer, (err) => {console.log(err)});
            return await this.repository.modify(categoryName, newCategoryName, "categoryImages/"+newFile.originalname)
        }
        else{
            return await this.repository.modify(categoryName, newCategoryName, undefined)
        }
    }

    async getAll(): Promise<String[]>{ 
        return await this.repository.getAll();
    }

    async getImageByName(name: string): Promise<string | undefined>{
        return await this.repository.getImageByName(name);
    }
}