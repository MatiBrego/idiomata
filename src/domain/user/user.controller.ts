import { Router } from "express";
import { db } from "../../utils/db";
import { withAuth } from "../../utils/auth";
import { UserDto } from "./user.dto";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { validateUserBody } from "../../utils/validation/user";


export const userRouter = Router();

const userService = new UserService(new UserRepository(db))



userRouter.post('/', validateUserBody, async (req, res) => {
    const user = req.body;

    const result = await userService.createUser(user)
    res.json(result)
})

userRouter.delete('/:userId', async (req, res) => {
    const userId = req.params.userId;

    await userService.deleteUser(Number(userId))

    res.send("User " + userId + " was deleted")
})

userRouter.put('/updatePassword', withAuth, async (req, res) => {
    const userId = res.locals.context;

    const newPassword = req.body.password;

    await userService.changeUsersPassword(Number(userId), newPassword);
    res.send("Password updated")
})

userRouter.put('/updateEmail', withAuth, async (req, res) => {
    const userId = res.locals.context;

    const newEmail = req.body.email;

    await userService.changeUsersEmail(Number(userId), newEmail);
    res.send("Email updated")
})

userRouter.get('/userData', withAuth, async(req, res) => {
    const userId = res.locals.context;

    const info = await userService.getUserById(userId);

    res.json(info)
})