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
    constructor(repository, requestRepository) {
        this.repository = repository;
        this.requestRepository = requestRepository;
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.create(user);
        });
    }
    deleteUserByEmail(userEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.deleteByEmail(userEmail);
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
    addFriend(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.addFriend(userId, friendId);
            yield this.requestRepository.deleteFriendRequest(userId, friendId);
        });
    }
    getAllFriends(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getFriendsByUser(userId);
        });
    }
    deleteFriend(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.deleteFriend(userId, friendId);
        });
    }
    sendFriendRequest(userId, friendEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.requestRepository.createFriendRequest(userId, friendEmail);
        });
    }
    rejectFriendRequest(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.requestRepository.deleteFriendRequest(userId, friendId);
        });
    }
    getFriendRequests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getFriendRequests(userId);
        });
    }
}
exports.UserService = UserService;
