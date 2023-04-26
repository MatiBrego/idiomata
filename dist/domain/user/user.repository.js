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
exports.UserRepository = void 0;
const user_dto_1 = require("./user.dto");
class UserRepository {
    constructor(db) {
        this.db = db;
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const userResult = yield this.db.user.create({
                data: user
            });
            return userResult;
        });
    }
    deleteByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.user.delete({
                where: {
                    email: userEmail
                }
            });
        });
    }
    changePassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.user.update({
                where: {
                    id: userId
                },
                data: {
                    password: newPassword
                }
            });
        });
    }
    changeEmail(userId, newEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.user.update({
                where: {
                    id: userId
                },
                data: {
                    email: newEmail
                }
            });
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userResult = yield this.db.user.findUnique({
                where: {
                    id: userId
                }
            });
            if (userResult) {
                return new user_dto_1.UserDto(userResult);
            }
            else {
                return null;
            }
        });
    }
    getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const userResult = yield this.db.user.findUnique({
                where: {
                    email: userEmail
                }
            });
            if (userResult) {
                return new user_dto_1.UserDto(userResult);
            }
            else {
                return null;
            }
        });
    }
    getUserByEmailIfAdmin(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const userResult = yield this.db.user.findFirst({
                where: {
                    AND: { email: userEmail, isAdmin: true }
                }
            });
            if (userResult) {
                return new user_dto_1.UserDto(userResult);
            }
            else {
                return null;
            }
        });
    }
}
exports.UserRepository = UserRepository;
