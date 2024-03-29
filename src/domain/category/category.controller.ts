import { Router } from "express";
import { db } from "../../utils/db";
import { CategoryRepository } from "./category.repository";
import { CategoryService } from "./category.service";
import { validateCategoryBody } from "../../utils/validation/category";
import multer from "multer";

export const categoryRouter = Router();

const categoryService = new CategoryService(new CategoryRepository(db))

categoryRouter.post('/', multer().single("file"), validateCategoryBody, async(req,res) =>{
    const category = req.body;
    const img = req.file;
    const result = await categoryService.createCategory({name: category.name, imgPath: img?.originalname}, img)
    res.json(result);
})

categoryRouter.delete('/', async(req, res)=>{
    const category = req.body.name;
    await categoryService.deleteCategory(category);
    res.send(category + " was deleted")
})

categoryRouter.put('/',multer().single('file') , async(req, res) =>{
    const categoryName = req.body.name;
    const newCategoryName = req.body.new_name;
    const newImagePath = req.file;

    await categoryService.modifyCategory(categoryName, newCategoryName, newImagePath);
    res.send(categoryName + ' has changed name to ' + newCategoryName + ' and the image has been updated correctly.')
})

categoryRouter.get('/', async(req, res) =>{
    const response = await categoryService.getAll();
    res.status(200).send(response);
    })

categoryRouter.get('/images/:name', async(req, res) => {
    const response = await categoryService.getImageByName(req.params.name);
    if(response){
        res.status(200).sendFile(__dirname+'/'+response);
    }
    else{
        res.status(404);
    }
})
