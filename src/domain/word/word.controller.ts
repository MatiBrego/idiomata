import { Router } from "express";
import { WordService } from "./word.service";
import { WordRepository } from "./word.repository";
import { db } from "../../utils/db";

export const wordRouter = Router();

const wordService = new WordService(new WordRepository(db));


// Endpoint to create a word
wordRouter.post("/", async (req, res) => {
    const data = req.body

    const wordCreated = await wordService.createWord(data);

    res.status(200).json(wordCreated)
})

// Endpoint to add a translation
wordRouter.post("/translation", async (req, res) => {
    const data = req.body

    const translationCreated = await wordService.addTranslation(data)

    res.status(200).json(translationCreated)
})

// Endpoint to get a word
wordRouter.get("/", async (req, res) => {
    const data = req.body

    const words = await wordService.getWords(data);

    console.log(words)

    res.status(200).send(words)
})