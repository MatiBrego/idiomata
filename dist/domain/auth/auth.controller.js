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
exports.authRouter = void 0;
const express_1 = require("express");
const db_1 = require("../../utils/db");
const auth_1 = require("../../utils/auth");
const user_repository_1 = require("../user/user.repository");
const user_service_1 = require("../user/user.service");
const auth_service_1 = require("./auth.service");
const authService = new auth_service_1.AuthService(new user_service_1.UserService(new user_repository_1.UserRepository(db_1.db)));
exports.authRouter = (0, express_1.Router)();
//Endpoint to log in
exports.authRouter.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const user = yield authService.loginUser(data);
    if (user) {
        return res.status(200).send({ token: authService.generateToken(user) });
    }
    res.status(404).send({ message: "User with matching email and password not found" });
}));
//This endpoint can be used to check if token is still valid
exports.authRouter.get('/', auth_1.withAuth, (req, res) => {
    res.status(200).send("Token is valid");
});
//Endpoint to log out
exports.authRouter.delete('/logout', auth_1.removeAuth, (req, res) => {
    res.status(200).send({ message: "User logged out" });
});
