import { Router, Request, Response } from "express";
import { StatsService } from "./stats.service";
import { StatsRepository } from "./stats.repository";
import { db } from "../../utils/db";
import { withAuth } from "../../utils/auth";

const statsService = new StatsService(new StatsRepository(db))

export const statsRouter = Router()

// Endpoint to save a word attempt by a user.
statsRouter.post('/wordAttempt', withAuth, async (req, res) => {
    const data = req.body

    data.userId = res.locals.context

    const attempt = await statsService.createWordAttempt(data)

    res.status(200).json(attempt)
})

// Enpoint to get all attempts made by a user. QueryParams must have language, may have category and difficulty
statsRouter.get('/wordAttempt', withAuth, async (req: Request<{}, {}, {}, {language: string, category: string}>, res: Response) => {
    const data = req.query
    const userId = res.locals.context

    const attempts = await statsService.getWordAttemptsByUserId(userId, data)

    res.status(200).json(attempts)
})

//Returns wordAttempts with the quantity of errors made in each word, in descending order 
statsRouter.get('/wordAttempt/errorsByWord', withAuth, async (req: Request<{}, {}, {}, {language: string, category?: string}>, res: Response) => {
    const data = req.query
    const userId = res.locals.context

    const attempts = await statsService.getAttemptsByWord(userId, data)

    res.status(200).json(attempts)
})