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
exports.validatePassword = exports.validateThatEmailExists = exports.validateUserBody = void 0;
const db_1 = require("../db");
const user_repository_1 = require("../../domain/user/user.repository");
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
    const email = req.params.userEmail;
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
function existsUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRepository = new user_repository_1.UserRepository(db_1.db);
        return yield userRepository.getUserByEmail(email);
    });
}
