"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SentenceInputDto = exports.SentenceDto = void 0;
// SentenceBlanks is an array of arrays where index 0 is word in english and the following elements are the possible translations of the word.
class SentenceDto {
    constructor(sentence) {
        this.id = sentence.id;
        this.languageId = sentence.languageId;
        this.difficulty = sentence.difficulty;
        this.sentenceParts = sentence.sentenceParts;
        this.sentenceBlanks = sentence.sentenceBlanks;
    }
}
exports.SentenceDto = SentenceDto;
class SentenceInputDto {
    constructor(sentenceInput) {
        this.languageId = sentenceInput.languageId;
        this.difficulty = sentenceInput.difficulty;
        this.sentenceParts = sentenceInput.sentenceParts;
        this.wordsInEnglish = sentenceInput.wordsInEnglish;
    }
}
exports.SentenceInputDto = SentenceInputDto;
