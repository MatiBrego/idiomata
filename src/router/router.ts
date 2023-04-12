import { Router } from "express";
import { authRouter } from "../domain/auth/auth.controller";
import { userRouter } from "../domain/user/user.controller";
import { categoryRouter } from "../domain/category/category.controller";
import { languageRouter } from "../domain/language/language.controller";

export const router = Router();

router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/category', categoryRouter);
router.use('/language', languageRouter);