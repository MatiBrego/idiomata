import { Request, Response } from "express";
import { db } from "../db";
import { UserRepository } from "../../domain/user/user.repository";

export const validateUserBody = async (req: Request, res: Response, next: any) => {
    const email = req.body.email;
    const password = req.body.password;

    if(email){
        if((await existsUserByEmail(email))){ return res.status(409).send("Email already exists")}
        if(password === "" || password.includes(" ")){return res.status(400).send("Invalid Password")}

        next()
        return
    }
}

export const validateThatEmailExists = async (req: Request, res: Response, next: any) => {
    const email = req.params.userEmail || req.body.userEmail;

    if(email){
        if(!(await existsUserByEmail(email))){ return res.status(404).send("Email not found")}

        next()
        return
    }

    return res.status(400).send("Email missing")    
}

export const validatePassword = async (req: Request, res: Response, next: any) => {
    const password = req.body.password;

    if(password){
        if(password === "" || password.includes(" ")){return res.status(400).send("Invalid Password")}

        next()
        return
    }
}

async function existsUserByEmail(email: string){
    const userRepository = new UserRepository(db);

    return await userRepository.getUserByEmail(email);
}