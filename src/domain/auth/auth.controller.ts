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

//Endpoint to check if token user is still valid
authRouter.get('/', withAuth, (req, res) => {
    res.status(200).send({message: "Token is valid"})
})

//Endpoint to log out
authRouter.delete('/logout', removeAuth, (req, res) => {
    res.status(200).send({message: "User logged out"})
})

//Endpoint to log in as admin
authRouter.post('/admin/login', async (req, res) => {
    const data = req.body

    const admin = await authService.loginAdmin(data); 

    if(admin){
        return res.status(200).send({token: authService.generateToken(admin)})
    }

    res.status(404).send({message: "Admin with matching email and password not found"})
})

//Endpoint to check if admin token is still valid
authRouter.get("/admin", withAuth, async (req, res) => {
    
    const userId = res.locals.context

    const isAdmin = await authService.isAdmin(Number(userId));

    if(isAdmin) return res.status(200).send({message: "Token is valid"});

    res.status(403).send({message: "Only admins can access this info"})
})

//Endpoint to logout admin
authRouter.delete("/admin/logout", removeAuth, (req, res) => {
    res.status(200).send({message: "Admin logged out"})
})