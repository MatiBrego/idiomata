import { Request, Response } from "express";
import { CategoryRepository } from "../../domain/category/category.repository";
import { db } from "../db";


export const validateCategoryBody = async (req: Request, res: Response, next: any) => {
    const categroy = req.body.name;

    if(categroy){
        if((await existsCategoryByName(categroy))){ return res.status(400).send("Category already exists")}

        next()
        return
    }
}

async function existsCategoryByName(category: string){
    const categoryRepository = new CategoryRepository(db);

    return await categoryRepository.getByName(category);
}