"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WordAttemptSearchInputDto = exports.WordAttemptDto = exports.WordAttemptInputDto = void 0;
class WordAttemptInputDto {
    constructor(attempt) {
        this.userId = attempt.userId;
        this.translationId = attempt.translationId;
        this.correct = attempt.correct;
        this.word = attempt.word;
        this.language = attempt.language;
        this.game = attempt.game;
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
        this.game = attempt.game;
    }
}
exports.WordAttemptSearchInputDto = WordAttemptSearchInputDto;
