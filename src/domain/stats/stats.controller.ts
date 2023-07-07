import { Router, Request, Response } from "express";
import { StatsService } from "./stats.service";
import { StatsRepository } from "./stats.repository";
import { db } from "../../utils/db";
import { withAuth } from "../../utils/auth";
import { Difficulty, Game } from "@prisma/client";
import { UserService } from "../user/user.service";
import { UserRepository } from "../user/user.repository";
import { RequestRepository } from "../request/request.repository";

const statsService = new StatsService(new StatsRepository(db))
const userService = new UserService(new UserRepository(db), new RequestRepository(db))

export const statsRouter = Router()

// Endpoint to save a word attempt by a user.
statsRouter.post('/wordAttempt', withAuth, async (req, res) => {
    const data = req.body

    data.userId = res.locals.context

    const attempt = await statsService.createWordAttempt(data)

    res.status(200).json(attempt)
})

// Enpoint to get all attempts made by a user. QueryParams must have language, may have category and difficulty
statsRouter.get('/wordAttempt', withAuth, async (req: Request<{}, {}, {}, {language: string, category?: string, difficulty?: Difficulty, game?: Game}>, res: Response) => {
    const data = req.query
    const userId = res.locals.context

    const attempts = await statsService.getWordAttemptsByUserId(userId, data)

    res.status(200).json(attempts)
})

//Returns wordAttempts with the quantity of errors made in each word, in descending order 
statsRouter.get('/wordAttempt/errorsByWord', withAuth, async (req: Request<{}, {}, {}, {language: string, category?: string, difficulty?: Difficulty, game?: Game}>, res: Response) => {
    const data = req.query
    const userId = res.locals.context

    const attempts = await statsService.getAttemptsByWord(userId, data)

    res.status(200).json(attempts)
})

// Enpoint to get all attempts made by a user's ID. QueryParams must have language, may have category and difficulty
statsRouter.get('/wordAttemptById', async (req: Request<{}, {}, {}, {userId: number, category?: string, difficulty?: Difficulty, game?: Game}>, res: Response) => {
    const data = req.query
    const userId = data.userId
    const userData = await userService.getUserById(Number(userId));
    
    const attempts = await statsService.getWordAttemptsByUserId(Number(userId), {language: userData?.language? userData.language : undefined})

    res.status(200).json(attempts)
})

//Returns wordAttempts with the quantity of errors made in each word, in descending order by user's ID
statsRouter.get('/wordAttempt/errorsByWordById', async (req: Request<{}, {}, {}, {userId: number, category?: string, difficulty?: Difficulty, game?: Game}>, res: Response) => {
    const data = req.query
    const userId = data.userId
    const userData = await userService.getUserById(Number(userId));

    const attempts = await statsService.getAttemptsByWord(Number(userId), {language: userData?.language? userData.language : undefined})

    res.status(200).json(attempts)
})