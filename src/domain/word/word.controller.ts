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
wordRouter.post("/wordlist", async (req, res) => {
    const data = req.body
    
    const words = await wordService.getWords(data);

    res.status(200).send(words)
})

wordRouter.get("/translation/:word", async (req, res) => {
    
    const wordInEnglish = req.params.word

    const translations = await wordService.getWordByName(wordInEnglish);

    res.status(200).send(translations)
})

wordRouter.delete("/", async (req, res) => {
    const wordInEnglish = req.body.inEnglish
    await wordService.deleteWord(wordInEnglish)
    res.status(200).json(wordInEnglish + " was deleted")
})

wordRouter.delete("/translation", async (req, res) => {
    const translationId = req.body.id
    await wordService.deleteTranslation(translationId)
    res.status(200).json("Translation with id " + translationId + " was deleted")
})