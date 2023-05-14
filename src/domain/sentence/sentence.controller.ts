import { Router } from "express";
import { SentenceService } from "./sentence.service";
import { SentenceRepository } from "./sentence.repository";
import { db } from "../../utils/db";

const sentenceService = new SentenceService(new SentenceRepository(db))

export const sentenceRouter = Router();

sentenceRouter.post("/", async (req, res) => {
    const data = req.body;

    const sentence = await sentenceService.createSentence(data);

    res.status(200).json(sentence)
})

sentenceRouter.get("/:language", async (req, res) => {
    const language = req.params.language

    const result = await sentenceService.getSentencesByLanguage(language)

    res.status(200).json(result)
})