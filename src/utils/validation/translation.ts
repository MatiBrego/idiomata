import { Request, Response } from "express";
import { WordRepository } from "../../domain/word/word.repository";
import { db } from "../db";


export const validateTranslationBody = async (req: Request, res: Response, next: any) => {
    let word = req.params.word;
    
    if(word){
        if(!(await existsWordInEnglish(word))) return res.status(404).send("Word not found")
    
        next();
        return
    }
    word = req.body.word

    if(word){
        if((!await existsWordInEnglish(word))) return res.status(404).send("Word not found")
    
        next();
        return
    }

    word = req.body.inEnglish

    if(word){
        if((!await existsWordInEnglish(word))) return res.status(404).send("Word not found")
    
        next();
        return
    }

    word = req.body.id

    if(word){
        if((!await existsTranslationById(Number(word)))) return res.status(404).send("Translation not found")

        next();
        return
    }
    
    return res.status(400).send("Word in english missing")
}

async function existsWordInEnglish(inEnglish: string){
    const wordRepository = new WordRepository(db);

    return await wordRepository.getUniqueWord(inEnglish)
}

async function existsTranslationById(translationId:number) {
    const wordRepository = new WordRepository(db);

    return await wordRepository.getTranslationById(translationId)
}