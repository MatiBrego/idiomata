import { Request, Response } from "express";
import { LanguageRepository } from "../../domain/language/language.repository";
import { db } from "../db";


export const validateLanguageBody = async (req: Request, res: Response, next: any) => {
    const language = req.body.name;

    if(language){
        if(await (existsLanguageByName(language))){ return res.status(400).send("Language already exists")}

        next()
        return
    }
}

async function existsLanguageByName(language: string){
    const languageRepository = new LanguageRepository(db);

    return await languageRepository.getByName(language);
}