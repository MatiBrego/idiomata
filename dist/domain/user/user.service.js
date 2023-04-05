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
exports.UserService = void 0;
class UserService {
    constructor(repository) {
        this.repository = repository;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.create(user);
        });
    }
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete(userId);
        });
    }
    changeUsersPassword(userId, newPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.changePassword(userId, newPassword);
        });
    }
    changeUsersEmail(userId, newEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.changeEmail(userId, newEmail);
        });
    }
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getUserById(userId);
        });
    }
    getUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getUserByEmail(userEmail);
        });
    }
    /**
     * Returns a user only if they are admin, otherwise it returns null
     *
     * @param userEmail
     * @returns {UserDto} UserDto if found, null if not found or not admin
     */
    getAdminByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getUserByEmailIfAdmin(userEmail);
        });
    }
}
exports.UserService = UserService;
