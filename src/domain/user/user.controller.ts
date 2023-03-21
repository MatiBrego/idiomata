import { Router } from "express";
import { db } from "../../utils/db";
import { UserDto } from "./user.dto";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";


export const userRouter = Router();

const userService = new UserService(new UserRepository(db))



userRouter.post('/', async (req, res) => {
    const user = req.body;

    const result = await userService.createUser(user)
    res.json(result)
})

userRouter.delete('/:userId',async (req, res) => {
    const userId = req.params.userId;

    await userService.deleteUser(Number(userId))

    res.send("User " + userId + " was deleted")
})