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
            let attempt;
            if (wordAttempt.translationId) {
                attempt = yield this.db.wordAttempt.create({
                    data: {
                        translation: { connect: { id: wordAttempt.translationId } },
                        user: { connect: { id: wordAttempt.userId } },
                        correct: wordAttempt.correct,
                        word: { connect: { inEnglish: wordAttempt.word } },
                        language: { connect: { name: wordAttempt.language } },
                        game: wordAttempt.game
                    }
                });
            }
            else {
                attempt = yield this.db.wordAttempt.create({
                    data: {
                        user: { connect: { id: wordAttempt.userId } },
                        correct: wordAttempt.correct,
                        word: { connect: { inEnglish: wordAttempt.word } },
                        language: { connect: { name: wordAttempt.language } },
                        game: wordAttempt.game
                    }
                });
            }
            return new stats_dto_1.WordAttemptDto(attempt);
        });
    }
    getAllAttemptsByUser(userId, searchInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const attempt = yield this.db.wordAttempt.findMany({
                where: {
                    userId: userId,
                    language: { name: searchInput.language },
                    word: { category: { name: searchInput.category } },
                    game: searchInput.game
                },
                select: {
                    id: true,
                    correct: true,
                    word: { select: { inEnglish: true } }
                }
            });
            return attempt;
        });
    }
    getAttemptsByWord(userId, searchInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const attempts = yield this.db.word.findMany({
                where: {
                    wordAttempts: {
                        some: {
                            AND: {
                                userId: userId,
                                correct: false,
                                language: { name: searchInput.language },
                            }
                        }
                    },
                    category: { name: searchInput.category },
                },
                select: {
                    inEnglish: true,
                    wordAttempts: { where: { correct: false, language: { name: searchInput.language }, userId: userId, game: searchInput.game }, select: { id: true } }
                }
            });
            return attempts;
        });
    }
    createMemotestAttempt(userId, timeInSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const attempt = yield this.db.memotestStats.create({
                data: {
                    user: { connect: { id: userId } },
                    bestTime: timeInSeconds
                }
            });
        });
    }
    updateMemotestAttempt(userId, timeInSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const attempt = yield this.db.memotestStats.update({
                where: { userId: userId },
                data: { bestTime: timeInSeconds }
            });
        });
    }
    getMemotestAttemptByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const attempt = yield this.db.memotestStats.findUnique({
                where: { userId: userId },
                select: { bestTime: true }
            });
            return attempt ? { bestTime: attempt.bestTime } : null;
        });
    }
}
exports.StatsRepository = StatsRepository;
