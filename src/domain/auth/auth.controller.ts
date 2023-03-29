import { Router } from "express";
import { AuthService } from "./auth.service";


const authService = new AuthService()

const authRouter = Router()

authRouter.post('/login', async (req, res) => {
    const data = req.body

    const user = await authService.loginUser(data)

    if(user){
        res.status(200).json({token: authService.generateToken(data)})
    }
})