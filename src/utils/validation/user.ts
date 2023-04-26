import { Request, Response } from "express";
import { db } from "../db";
import { UserRepository } from "../../domain/user/user.repository";

export const validateUserBody = async (req: Request, res: Response, next: any) => {
    const email = req.body.email;

    if(email){
        if((await existsUserByEmail(email))){ return res.status(409).send("Email already exists")}

        next()
        return
    }
}

export const validateThatEmailExists = async (req: Request, res: Response, next: any) => {
    const email = req.params.userEmail;

    if(email){
        if(!(await existsUserByEmail(email))){ return res.status(404).send("Email not found")}

        next()
        return
    }

    return res.status(400).send("Email missing")    
}

async function existsUserByEmail(email: string){
    const userRepository = new UserRepository(db);

    return await userRepository.getUserByEmail(email);
}