import { Router } from "express";
import { db } from "../../utils/db";
import { withAuth } from "../../utils/withAuth";
import { UserRepository } from "../user/user.repository";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";


const authService = new AuthService(new UserService(new UserRepository(db)))

export const authRouter = Router()

authRouter.post('/login', async (req, res) => {
    const data = req.body

    const user = await authService.loginUser(data)

    if(user){
        res.status(200).json({token: authService.generateToken(user)})
    }
})

authRouter.get('/private', withAuth, (req, res) => {
    res.status(200).json({userId: res.locals.context})
})