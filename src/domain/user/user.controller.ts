import { Router } from "express";
import { db } from "../../utils/db";
import { withAuth } from "../../utils/auth";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { validatePassword, validateThatEmailExists, validateUserBody } from "../../utils/validation/user";


export const userRouter = Router();

const userService = new UserService(new UserRepository(db))



userRouter.post('/', validateUserBody, async (req, res) => {
    const user = req.body;

    const result = await userService.createUser(user)
    res.json(result)
})


userRouter.delete('/:userEmail', validateThatEmailExists,async (req, res) => {
    const userEmail = req.params.userEmail;

    await userService.deleteUserByEmail(userEmail);

    res.status(200).send("User with email " + userEmail + " was deleted.")
})

userRouter.put('/updatePassword', validatePassword, withAuth, async (req, res) => {
    const userId = res.locals.context;

    const newPassword = req.body.password;

    await userService.changeUsersPassword(Number(userId), newPassword);
    res.status(200).send("Password updated")
})

userRouter.put('/updateEmail', validateUserBody, withAuth, async (req, res) => {
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

userRouter.put('/addFriend', withAuth,async (req, res) => {
    const userId = res.locals.context;
    const friendId = req.body.id;

    await userService.addFriend(userId, friendId);
    res.status(200).send("Friend added successfully")
})