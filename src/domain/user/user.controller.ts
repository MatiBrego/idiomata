import { Router } from "express";
import { db } from "../../utils/db";
import { withAuth } from "../../utils/withAuth";
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

userRouter.put('/updatePassword/:userId', async (req, res) => {
    const userId = req.params.userId;

    const newPassword = req.body.password;

    await userService.changeUsersPassword(Number(userId), newPassword);
    res.send("Password updated")
})

userRouter.put('/updateEmail/:userId', async (req, res) => {
    const userId = req.params.userId;

    const newEmail = req.body.email;

    await userService.changeUsersEmail(Number(userId), newEmail);
    res.send("Email updated")
})