"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceRequesterDto = exports.SentenceInputDto = exports.SentenceDto = void 0;
// SentenceBlanks is an array of arrays where index 0 is word in english and the following elements are the possible translations of the word.
class SentenceDto {
    constructor(sentence) {
        this.id = sentence.id;
        this.language = sentence.language;
        this.difficulty = sentence.difficulty;
        this.parts = sentence.parts;
        this.blanks = sentence.blanks;
    }
}
exports.SentenceDto = SentenceDto;
class SentenceInputDto {
    constructor(sentenceInput) {
        this.language = sentenceInput.language;
        this.difficulty = sentenceInput.difficulty;
        this.parts = sentenceInput.parts;
        this.wordsInEnglish = sentenceInput.wordsInEnglish;
    }
}
exports.SentenceInputDto = SentenceInputDto;
class SentenceRequesterDto {
    constructor(sentenceRequester) {
        this.language = sentenceRequester.language;
        this.difficulty = sentenceRequester.difficulty;
    }
}
exports.SentenceRequesterDto = SentenceRequesterDto;
