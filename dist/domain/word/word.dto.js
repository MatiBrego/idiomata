"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TranslationDto = exports.TranslationInputDto = exports.WordWithTranslationsDto = exports.WordDto = exports.WordInputDto = exports.WordRequestDto = void 0;
// Dto for requesting a word. Can have category, difficulty and a word limit. Must have language
class WordRequestDto {
    constructor(wordRequest) {
        this.language = wordRequest.language;
        this.category = wordRequest.category;
        this.difficulty = wordRequest.difficulty;
        this.limit = wordRequest.limit;
    }
}
exports.WordRequestDto = WordRequestDto;
// Dto for creating a word
class WordInputDto {
    constructor(wordInput) {
        this.category = wordInput.category;
        this.inEnglish = wordInput.inEnglish;
    }
}
exports.WordInputDto = WordInputDto;
class WordDto {
    constructor(word) {
        this.id = word.id;
        this.inEnglish = word.inEnglish;
        this.categoryId = word.categoryId;
    }
}
exports.WordDto = WordDto;
// Dto for a word with its translations in a certain language
class WordWithTranslationsDto extends WordDto {
    constructor(word) {
        super({ id: word.id, inEnglish: word.inEnglish, categoryId: word.categoryId });
        this.language = word.language;
        this.translations = word.translations;
    }
}
exports.WordWithTranslationsDto = WordWithTranslationsDto;
class TranslationInputDto {
    constructor(translation) {
        this.word = translation.word;
        this.translated = translation.translated;
        this.difficulty = translation.difficulty;
        this.language = translation.language;
    }
}
exports.TranslationInputDto = TranslationInputDto;
class TranslationDto {
    constructor(translation) {
        this.id = translation.id;
        this.translated = translation.translated;
        this.languageId = translation.languageId;
        this.difficulty = translation.difficulty;
    }
}
exports.TranslationDto = TranslationDto;
