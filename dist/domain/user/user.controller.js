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
exports.userRouter = (0, express_1.Router)();
const userService = new user_service_1.UserService(new user_repository_1.UserRepository(db_1.db));
exports.userRouter.post('/', user_1.validateUserBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield userService.createUser(user);
    res.json(result);
}));
exports.userRouter.delete('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    yield userService.deleteUser(Number(userId));
    res.send("User " + userId + " was deleted");
}));
exports.userRouter.put('/updatePassword', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const newPassword = req.body.password;
    yield userService.changeUsersPassword(Number(userId), newPassword);
    res.send("Password updated");
}));
exports.userRouter.put('/updateEmail', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const newEmail = req.body.email;
    yield userService.changeUsersEmail(Number(userId), newEmail);
    res.send("Email updated");
}));
exports.userRouter.get('/userData', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const info = yield userService.getUserById(userId);
    res.json(info);
}));
