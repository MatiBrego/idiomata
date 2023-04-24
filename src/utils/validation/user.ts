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

async function existsUserByEmail(email: string){
    const userRepository = new UserRepository(db);

    return await userRepository.getUserByEmail(email);
}