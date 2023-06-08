import { Router } from "express";
import { db } from "../../utils/db";
import { withAuth } from "../../utils/auth";
import { UserRepository } from "./user.repository";
import { UserService } from "./user.service";
import { validatePassword, validateThatEmailExists, validateUserBody } from "../../utils/validation/user";
import { RequestRepository } from "../request/request.repository";


export const userRouter = Router();

const userService = new UserService(new UserRepository(db), new RequestRepository(db))



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

userRouter.put('/addFriend', withAuth, async (req, res) => {
    const userId = res.locals.context;
    const friendId = req.body.id;

    await userService.addFriend(userId, Number(friendId));
    res.status(200).send("Friend added successfully")
})

userRouter.get('/friends', withAuth, async (req, res) => {
    const userId = res.locals.context;
    
    const friends = await userService.getAllFriends(userId);
    res.status(200).json(friends);

})

userRouter.delete('/friend/:friendId', withAuth, async (req, res) => {
    const userId = res.locals.context;
    const friendId = req.params.friendId;

    await userService.deleteFriend(userId, Number(friendId));

    res.status(200).send("Friend deleted");
})

userRouter.post('/request', withAuth, async (req, res) => {
    const userId = res.locals.context;
    const friendId = req.body.friendId;

    await userService.sendFriendRequest(userId, Number(friendId));

    res.status(200).send("Request Sent");
})

userRouter.delete('/request/:friendId', withAuth, async (req, res) => {
    const userId = res.locals.context;
    const friendId = req.params.friendId;

    await userService.rejectFriendRequest(userId, Number(friendId));

    res.status(200).send("Request Deleted");
})

userRouter.get('/request', withAuth, async (req, res) => {
    const userId = res.locals.context;

    const requests = await userService.getFriendRequests(userId);

    res.status(200).json(requests);
})