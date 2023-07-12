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
                data: { name: user.name, language: { connect: { name: user.language } }, email: user.email, password: user.password }
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
    getUserLanguage(userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.user.findUnique({
                where: { id: userId },
                select: { language: { select: { name: true } } }
            });
            return (_a = result === null || result === void 0 ? void 0 : result.language) === null || _a === void 0 ? void 0 : _a.name;
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
    changeLanguage(userId, newLanguage) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.user.update({
                where: {
                    id: userId
                },
                data: {
                    language: { connect: { name: newLanguage } }
                }
            });
        });
    }
    getUserById(userId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const userResult = yield this.db.user.findUnique({
                where: {
                    id: userId
                },
                include: { language: { select: { name: true } } }
            });
            if (userResult) {
                return new user_dto_1.UserDto({ id: userResult.id, name: userResult.name, email: userResult.email, password: userResult.password, languageId: userResult.languageId, language: (_a = userResult.language) === null || _a === void 0 ? void 0 : _a.name, isAdmin: userResult.isAdmin });
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
    addFriend(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.user.update({
                where: {
                    id: userId,
                },
                data: {
                    friends: {
                        connect: {
                            id: friendId,
                        },
                    },
                },
            });
            yield this.db.user.update({
                where: {
                    id: friendId,
                },
                data: {
                    friends: {
                        connect: {
                            id: userId,
                        },
                    },
                },
            });
        });
    }
    getFriendsByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.user.findUnique({
                where: { id: userId },
                include: {
                    friends: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                            wordAttempts: true
                        }
                    }
                }
            });
        });
    }
    deleteFriend(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.user.update({
                where: { id: userId },
                data: {
                    friends: {
                        disconnect: { id: friendId }
                    }
                }
            });
            yield this.db.user.update({
                where: { id: friendId },
                data: {
                    friends: {
                        disconnect: { id: userId }
                    }
                }
            });
        });
    }
    getFriendRequests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const requests = yield this.db.user.findUnique({
                where: { id: userId },
                include: {
                    requestsReceived: {
                        select: { requester: { select: { id: true, name: true, email: true } } }
                    }
                }
            });
            return requests;
        });
    }
    searchIfAlreadyFriends(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            const friends = yield this.db.user.findUnique({
                where: { id: userId },
                include: {
                    friends: {
                        select: { id: true }
                    }
                }
            });
            if (friends === null || friends === void 0 ? void 0 : friends.friends.some((friend) => friend.id === friendId)) {
                return true;
            }
            else {
                return false;
            }
        });
    }
}
exports.UserRepository = UserRepository;
