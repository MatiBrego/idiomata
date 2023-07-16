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
exports.StatsService = void 0;
class StatsService {
    constructor(repository) {
        this.repository = repository;
    }
    createWordAttempt(wordAttempt) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.createWordAttempt(wordAttempt);
        });
    }
    getWordAttemptsByUserId(userId, searchInput) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getAllAttemptsByUser(userId, searchInput);
        });
    }
    getAttemptsByWord(userId, searchInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const words = yield this.repository.getAttemptsByWord(userId, searchInput);
            //Declare new result array
            const result = [];
            //Add word and error number to result for each word
            words.forEach(word => {
                if (word.wordAttempts.length > 0)
                    result.push({ word: word.inEnglish, errors: word.wordAttempts.length });
            });
            //Sort by errors, descending order
            result.sort((a, b) => {
                if (a.errors < b.errors)
                    return 1;
                if (a.errors > b.errors)
                    return -1;
                return 0;
            });
            return result;
        });
    }
    createMemotestAttempt(userId, timeInSeconds) {
        return __awaiter(this, void 0, void 0, function* () {
            const prevTime = yield this.repository.getMemotestAttemptByUserId(userId);
            if (prevTime) {
                if (timeInSeconds < prevTime.bestTime) {
                    yield this.repository.updateMemotestAttempt(userId, timeInSeconds);
                }
            }
            else {
                yield this.repository.createMemotestAttempt(userId, timeInSeconds);
            }
        });
    }
    getMemotestAttemptByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getMemotestAttemptByUserId(userId);
        });
    }
}
exports.StatsService = StatsService;
