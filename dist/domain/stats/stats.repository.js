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
exports.StatsRepository = void 0;
const stats_dto_1 = require("./stats.dto");
class StatsRepository {
    constructor(db) {
        this.db = db;
    }
    createWordAttempt(wordAttempt) {
        return __awaiter(this, void 0, void 0, function* () {
            const attempt = yield this.db.wordAttempt.create({
                data: {
                    translation: { connect: { id: wordAttempt.translationId } },
                    user: { connect: { id: wordAttempt.userId } },
                    correct: wordAttempt.correct
                }
            });
            return new stats_dto_1.WordAttemptDto(attempt);
        });
    }
    getAllAttemptsByUser(userId, searchInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const attempt = yield this.db.wordAttempt.findMany({
                where: {
                    userId: userId,
                    translation: {
                        is: {
                            language: {
                                is: {
                                    name: searchInput.language
                                }
                            },
                            difficulty: searchInput.difficulty,
                            word: {
                                is: {
                                    category: { is: { name: searchInput.category } }
                                }
                            }
                        }
                    }
                },
                select: {
                    id: true,
                    correct: true
                }
            });
            return attempt;
        });
    }
}
exports.StatsRepository = StatsRepository;
