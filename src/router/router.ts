import { Router } from "express";
import { authRouter } from "../domain/auth/auth.controller";
import { userRouter } from "../domain/user/user.controller";
import { wordRouter } from "../domain/word/word.controller";

export const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/word', wordRouter)