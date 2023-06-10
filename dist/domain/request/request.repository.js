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
exports.RequestRepository = void 0;
class RequestRepository {
    constructor(db) {
        this.db = db;
    }
    createFriendRequest(userId, friendEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.friendRequest.create({
                data: {
                    requester: { connect: { id: userId } },
                    requested: { connect: { email: friendEmail } }
                }
            });
        });
    }
    deleteFriendRequest(userId, friendId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.friendRequest.deleteMany({
                where: {
                    OR: [
                        { AND: [
                                {
                                    requestedId: userId
                                },
                                {
                                    requesterId: friendId
                                }
                            ]
                        },
                        { AND: [
                                {
                                    requestedId: friendId
                                },
                                {
                                    requesterId: userId
                                }
                            ]
                        }
                    ]
                }
            });
        });
    }
}
exports.RequestRepository = RequestRepository;
