"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const db_1 = require("../../utils/db");
const auth_1 = require("../../utils/auth");
const user_repository_1 = require("./user.repository");
const user_service_1 = require("./user.service");
const user_1 = require("../../utils/validation/user");
const request_repository_1 = require("../request/request.repository");
exports.userRouter = (0, express_1.Router)();
const userService = new user_service_1.UserService(new user_repository_1.UserRepository(db_1.db), new request_repository_1.RequestRepository(db_1.db));
exports.userRouter.post('/', user_1.validateUserBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield userService.createUser(user);
    res.json(result);
}));
exports.userRouter.delete('/:userEmail', user_1.validateThatEmailExists, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userEmail = req.params.userEmail;
    yield userService.deleteUserByEmail(userEmail);
    res.status(200).send("User with email " + userEmail + " was deleted.");
}));
exports.userRouter.put('/updatePassword', user_1.validatePassword, auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const newPassword = req.body.password;
    yield userService.changeUsersPassword(Number(userId), newPassword);
    res.status(200).send("Password updated");
}));
exports.userRouter.put('/updateEmail', user_1.validateUserBody, auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const newEmail = req.body.email;
    yield userService.changeUsersEmail(Number(userId), newEmail);
    res.send("Email updated");
}));
exports.userRouter.put('/updateLanguage', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const newLanguage = req.body.language;
    yield userService.changeUsersLanguage(Number(userId), newLanguage);
    res.send("Language updated");
}));
exports.userRouter.get('/userData', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const info = yield userService.getUserById(userId);
    res.json(info);
}));
exports.userRouter.get('/userLanguage', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const user = yield userService.getUserById(userId);
    res.json({ language: user === null || user === void 0 ? void 0 : user.language });
}));
exports.userRouter.put('/addFriend', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const friendId = req.body.id;
    yield userService.addFriend(userId, Number(friendId));
    res.status(200).send("Friend added successfully");
}));
exports.userRouter.get('/friends', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const friends = yield userService.getAllFriends(userId);
    res.status(200).json(friends);
}));
exports.userRouter.delete('/friend/:friendId', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const friendId = req.params.friendId;
    yield userService.deleteFriend(userId, Number(friendId));
    res.status(200).send("Friend deleted");
}));
exports.userRouter.post('/request', auth_1.withAuth, user_1.validateThatEmailExists, user_1.validateFriendRequest, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const friendEmail = req.body.userEmail;
    yield userService.sendFriendRequest(userId, friendEmail);
    res.status(200).send("Request Sent");
}));
exports.userRouter.delete('/request/:friendId', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const friendId = req.params.friendId;
    yield userService.rejectFriendRequest(userId, Number(friendId));
    res.status(200).send("Request Deleted");
}));
exports.userRouter.get('/request', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const requests = yield userService.getFriendRequests(userId);
    res.status(200).json(requests);
}));
