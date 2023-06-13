import { Router, Request, Response } from "express";
import { SentenceService } from "./sentence.service";
import { SentenceRepository } from "./sentence.repository";
import { db } from "../../utils/db";
import { validateBlanks, validateDifficulty, validateLanguage } from "../../utils/validation/sentence";
import { Difficulty } from "@prisma/client";

const sentenceService = new SentenceService(new SentenceRepository(db))

export const sentenceRouter = Router();

sentenceRouter.post("/", validateBlanks, validateLanguage, validateDifficulty,async (req, res) => {
    const data = req.body;

    const sentence = await sentenceService.createSentence(data);

    res.status(200).json(sentence)
})

sentenceRouter.get("/", async (req: Request<{}, {}, {}, {language: string, difficulty: Difficulty}>, res:Response) => {
    const language = req.query.language
    let difficulty: Difficulty | undefined = req.query.difficulty
    if(difficulty.length === 0) {difficulty = undefined}

    const result = await sentenceService.getSentencesByLanguage(language, difficulty)

    res.status(200).json(result)
})

sentenceRouter.delete("/:id", async (req, res) => {
    const sentenceId = req.params.id

    await sentenceService.deleteSentenceById(Number(sentenceId))

    res.status(200).send("Sentence deleted")
})

sentenceRouter.put("/", async (req, res) => {
    const sentence = req.body;

    await sentenceService.updateSentence(sentence);


    res.status(200).send("Sentence updated")
})