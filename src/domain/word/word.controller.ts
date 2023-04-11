import { Router } from "express";
import { WordService } from "./word.service";
import { WordRepository } from "./word.repository";
import { db } from "../../utils/db";

export const wordRouter = Router();

const wordService = new WordService(new WordRepository(db));

//Get words. Query params can be cat(Category), dif(difficulty) and limit
wordRouter.get("/", (req, res) => {
    const requestData = req.body
    

    wordService.getWords(requestData);
})