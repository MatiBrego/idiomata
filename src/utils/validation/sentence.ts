import { Request, Response } from "express";
import { existsWordByName } from "./word";

export const validateBlanks = async (req: Request, res: Response, next: any) => {
    const words = req.body.wordsInEnglish || req.body.blanks

    let hasInvalidWords = false

    for(let i = 0; i < words.length; i++){
        if(!(await existsWordByName(words[i]))){return res.status(404).send("Word not found")}
    }

    next()
    return

}

export function validateLanguage(req: Request, res: Response, next: any){
    const language = req.body.language 
    if(!language){return res.status(400).send("Language missing")}

    next()
    return
}

export function validateDifficulty(req: Request, res: Response, next: any){
    const difficulty = req.body.difficulty
    if(!difficulty){return res.status(400).send("Difficulty missing")}

    next()
    return
}