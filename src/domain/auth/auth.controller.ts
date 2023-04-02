import { Router } from "express";
import { db } from "../../utils/db";
import { removeAuth, withAuth } from "../../utils/auth";
import { UserRepository } from "../user/user.repository";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";


const authService = new AuthService(new UserService(new UserRepository(db)))

export const authRouter = Router()

//Endpoint to log in
authRouter.post('/login', async (req, res) => {
    const data = req.body

    const user = await authService.loginUser(data)

    if(user){
        return res.status(200).send({token: authService.generateToken(user)})
    }

    res.status(404).send({message: "User with matching email and password not found"})
}) 

//This endpoint can be used to check if token is still valid
authRouter.get('/', withAuth, (req, res) => {
    res.status(200).send("Token is valid")
})

//Endpoint to log out
authRouter.delete('/logout', removeAuth, (req, res) => {
    res.status(200).send({message: "User logged out"})
})