import { Request, Response } from "express";
import { WordRepository } from "../domain/word/word.repository";
import { db } from "./db";

export const validateTranslationBody = async (req: Request, res: Response, next: any) => {
    const word = req.params.word;
    
    const wordRepository = new WordRepository(db);

    const result = await wordRepository.getUniqueWord(word)

    if(!result) return res.status(404).send("Word not found")

    next();
}