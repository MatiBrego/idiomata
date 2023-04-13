import { Router } from "express";
import { db } from "../../utils/db";
import { LanguageRepository } from "./language.repository";
import { LanguageService } from "./language.service";



export const languageRouter = Router();

const languageService = new LanguageService(new LanguageRepository(db));

languageRouter.post('/', async(req,res)=>{
    const language = req.body;
    const result = await languageService.createLanguage(language);
    res.json(result);
})

languageRouter.delete('/', async(req,res)=>{
    const language = req.body.name;
    await languageService.deleteLanguage(language);
    res.json(language + " was deleted");
})

languageRouter.put('/', async(req,res)=>{
    const language = req.body.name;
    const newLanguageName = req.body.newname;
    await languageService.modifyLanguage(language, newLanguageName);
    res.json(language + " has changed name to " + newLanguageName);
})

languageRouter.get('/', async(req,res) =>{
    const response = await languageService.getAll();
    res.status(200).send(response);
    

}
)




