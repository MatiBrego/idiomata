import { Router } from "express";
import { userRouter } from "../domain/user/user.controller";

export const router = Router();

router.use('/user', userRouter);