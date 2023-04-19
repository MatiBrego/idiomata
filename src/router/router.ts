import { Router } from "express";
import { authRouter } from "../domain/auth/auth.controller";
import { userRouter } from "../domain/user/user.controller";
import { wordRouter } from "../domain/word/word.controller";
import { categoryRouter } from "../domain/category/category.controller";
import { languageRouter } from "../domain/language/language.controller";
import { statsRouter } from "../domain/stats/stats.controller";

export const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/word', wordRouter);
router.use('/category', categoryRouter);
router.use('/language', languageRouter);
router.use('/stats', statsRouter)