import { Request, Response } from "express";
import { db } from "../db";
import { WordRepository } from "../../domain/word/word.repository";


export const validateWordBody = async (req: Request, res: Response, next: any) => {
    const word = req.body.inEnglish;

    if(word){
        if((await existsWordByName(word))){ return res.status(400).send("Word already exists")}

        next()
        return
    }
}

async function existsWordByName(word: string){
    const wordRepository = new WordRepository(db);

    return await wordRepository.getUniqueWord(word);
}