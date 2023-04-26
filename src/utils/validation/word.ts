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

export const validateWordUpdateBody = async (req: Request, res: Response, next: any) => {
    const oldWord = req.body.oldWord
    const newWord = req.body.newWord

    if(oldWord){
        if(!(await existsWordByName(oldWord))){ return res.status(400).send("Word does not exist")}
    }

    if(newWord){
        if((await existsWordByName(newWord))){ return res.status(400).send("Word already exists")}

        next()
        return
    }

}