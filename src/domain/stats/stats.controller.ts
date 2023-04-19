import { Router } from "express";
import { StatsService } from "./stats.service";
import { StatsRepository } from "./stats.repository";
import { db } from "../../utils/db";
import { withAuth } from "../../utils/auth";

const statsService = new StatsService(new StatsRepository(db))

export const statsRouter = Router()

// Endpoint to save a word attempt by a user.
statsRouter.post('/wordAttempt', withAuth, async (req, res) => {
    const data = req.body

    const attempt = await statsService.createWordAttempt(data)

    res.status(200).json(attempt)
})

// Enpoint to get all attempts made by a user. Body may have language, category and difficulty
statsRouter.get('/wordAttempt', withAuth, async (req, res) => {
    const data = req.body
    const userId = res.locals.context

    const attempts = await statsService.getWordAttemptsByUserId(userId, data)

    res.status(200).json(attempts)
})