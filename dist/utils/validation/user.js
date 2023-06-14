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
exports.validateFriendRequest = exports.validatePassword = exports.validateThatEmailExists = exports.validateUserBody = void 0;
const db_1 = require("../db");
const user_repository_1 = require("../../domain/user/user.repository");
const request_repository_1 = require("../../domain/request/request.repository");
const validateUserBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.body.email;
    const password = req.body.password;
    if (email) {
        if ((yield existsUserByEmail(email))) {
            return res.status(409).send("Email already exists");
        }
        if (password === "" || password.includes(" ")) {
            return res.status(400).send("Invalid Password");
        }
        next();
        return;
    }
});
exports.validateUserBody = validateUserBody;
const validateThatEmailExists = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.params.userEmail || req.body.userEmail;
    if (email) {
        if (!(yield existsUserByEmail(email))) {
            return res.status(404).send("Email not found");
        }
        next();
        return;
    }
    return res.status(400).send("Email missing");
});
exports.validateThatEmailExists = validateThatEmailExists;
const validatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const password = req.body.password;
    if (password) {
        if (password === "" || password.includes(" ")) {
            return res.status(400).send("Invalid Password");
        }
        next();
        return;
    }
});
exports.validatePassword = validatePassword;
const validateFriendRequest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userRepository = new user_repository_1.UserRepository(db_1.db);
    const requestRepository = new request_repository_1.RequestRepository(db_1.db);
    const friendEmail = req.body.userEmail;
    const userId = res.locals.context;
    const friend = yield userRepository.getUserByEmail(friendEmail);
    const friendRequests = yield requestRepository.getFriendRequest(userId, Number(friend === null || friend === void 0 ? void 0 : friend.id));
    const areFriends = yield userRepository.searchIfAlreadyFriends(userId, Number(friend === null || friend === void 0 ? void 0 : friend.id));
    if ((friend === null || friend === void 0 ? void 0 : friend.id) === userId) {
        return res.status(400).send("Cannot add yourself as a friend");
    }
    if (areFriends === true) {
        return res.status(400).send("Already friends");
    }
    if (friendRequests === true) {
        return res.status(400).send("Request already sent");
    }
    else {
        next();
        return;
    }
});
exports.validateFriendRequest = validateFriendRequest;
function existsUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = new user_repository_1.UserRepository(db_1.db);
        return yield userRepository.getUserByEmail(email);
    });
}
