"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordAttemptSearchInputDto = exports.WordAttemptDto = exports.WordAttemptInputDto = void 0;
class WordAttemptInputDto {
    constructor(attempt) {
        this.userId = attempt.userId;
        this.translationId = attempt.translationId;
        this.correct = attempt.correct;
        this.word = attempt.word;
    }
}
exports.WordAttemptInputDto = WordAttemptInputDto;
class WordAttemptDto {
    constructor(attempt) {
        this.userId = attempt.userId;
        this.translationId = attempt.translationId;
        this.correct = attempt.correct;
    }
}
exports.WordAttemptDto = WordAttemptDto;
class WordAttemptSearchInputDto {
    constructor(attempt) {
        this.language = attempt.language;
        this.difficulty = attempt.difficulty;
    }
}
exports.WordAttemptSearchInputDto = WordAttemptSearchInputDto;
