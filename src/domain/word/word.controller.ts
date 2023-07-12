import { Router, Request, Response } from "express";
import { WordService } from "./word.service";
import { WordRepository } from "./word.repository";
import { db } from "../../utils/db";
import { validateTranslationBody } from "../../utils/validation/translation";
import { validateWordBody, validateWordUpdateBody } from "../../utils/validation/word";
import multer from "multer";
import { parseFileToCsv } from "../../utils/parse";
import { CategoryRepository } from "../category/category.repository";
import { LanguageRepository } from "../language/language.repository";

export const wordRouter = Router();

const wordService = new WordService(new WordRepository(db), new CategoryRepository(db), new LanguageRepository(db));


// Endpoint to create a word
wordRouter.post("/", validateWordBody, async (req, res) => {
    const data = req.body

    const wordCreated = await wordService.createWord(data);

    res.status(200).json(wordCreated)
})

wordRouter.post("/upload", multer().single("file"), parseFileToCsv, async (req, res) => {

    const wordList = req.body

    const result = await wordService.uploadWordsFromList(wordList)

    if(result === null){
        return res.status(400).json("Csv format must be: 'word,category'")
    }

    res.status(200).json(result)  
})

// Endpoint to add a translation
wordRouter.post("/translation", validateTranslationBody, async (req, res) => {
    const data = req.body

    const translationCreated = await wordService.addTranslation(data)

    res.status(200).json(translationCreated)
})

wordRouter.post("/upload/translations", multer().single("file"), parseFileToCsv, async (req, res) => {

    const wordList = req.body

    const result = await wordService.uploadTranslationsFromList(wordList)

    if(result === null){
        return res.status(400).json("Csv format must be: 'wordInEnglish, translation, language, difficulty'")
    }

    res.status(200).json(result)  
})

// Endpoint to get many words. Body must have language; can have category and difficulty
wordRouter.post("/wordlist", async (req, res) => {
    const data = req.body
    
    const words = await wordService.getWords(data);

    res.status(200).send(words)
})

wordRouter.get("/translation/:word", validateTranslationBody, async (req, res) => {
    
    const wordInEnglish = req.params.word

    const translations = await wordService.getWordByName(wordInEnglish);

    res.status(200).send(translations)
})

wordRouter.delete("/", validateTranslationBody, async (req, res) => {
    const wordInEnglish = req.body.inEnglish
    await wordService.deleteWord(wordInEnglish)
    res.status(200).json(wordInEnglish + " was deleted")
})

wordRouter.delete("/translation", validateTranslationBody, async (req, res) => {
    const translationId = req.body.id
    await wordService.deleteTranslation(translationId)
    res.status(200).json("Translation with id " + translationId + " was deleted")
})

wordRouter.post("/update", validateWordUpdateBody, async (req, res) => {
    const oldWord = req.body.oldWord
    const newWord = req.body.newWord
    await wordService.updateWord(oldWord, newWord)
    res.status(200).send("Word updated")
})