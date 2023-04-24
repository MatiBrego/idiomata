import { Router } from "express";
import { db } from "../../utils/db";
import { CategoryRepository } from "./category.repository";
import { CategoryService } from "./category.service";
import { validateCategoryBody } from "../../utils/validation/category";
export const categoryRouter = Router();

const categoryService = new CategoryService(new CategoryRepository(db))

categoryRouter.post('/', validateCategoryBody, async(req,res) =>{
    const category = req.body;
    const result = await categoryService.createCategory(category)
    res.json(result);
})

categoryRouter.delete('/', async(req, res)=>{
    const category = req.body.name;
    await categoryService.deleteCategory(category);
    res.send(category + " was deleted")
})

categoryRouter.put('/', async(req, res) =>{
    const category = req.body.name;
    const modcategory = req.body.new_name;

    await categoryService.modifyCategory(category, modcategory);
    res.send(category + ' has changed name to ' + modcategory )
})

categoryRouter.get('/', async(req, res) =>{
    const response = await categoryService.getAll();
    res.status(200).send(response);
    })
    