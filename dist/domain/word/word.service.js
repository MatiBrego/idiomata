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
exports.WordService = void 0;
const client_1 = require("@prisma/client");
class WordService {
    constructor(repository, categoryRepository, languageRepository) {
        this.repository = repository;
        this.categoryRepository = categoryRepository;
        this.languageRepository = languageRepository;
    }
    createWord(word) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.createWord(word);
        });
    }
    addTranslation(translation) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.createTranslation(translation);
        });
    }
    uploadWordsFromList(wordList) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify csv headers
            const expectedFormat = ["word", "category"];
            if (wordList[0].toString().toLowerCase().trim() !== expectedFormat.toString().toLowerCase().trim())
                return null;
            const categories = yield this.categoryRepository.getAll();
            let lines = 0;
            const categoriesNotFound = new Set();
            const existingWords = new Set();
            for (let i = 1; i < wordList.length; i++) {
                const word = [wordList[i][0].toLowerCase().trim(), wordList[i][1].toLowerCase().trim()];
                if (categories.lastIndexOf(word[1]) === -1) {
                    categoriesNotFound.add(word[1]);
                }
                else if ((yield this.repository.getUniqueWord(word[0])) !== null) {
                    existingWords.add(word[0]);
                }
                else {
                    lines++;
                    yield this.repository.createWord({ category: word[1], inEnglish: word[0] });
                }
            }
            return { lines: lines, categoriesNotFound: Array.from(categoriesNotFound), existingWords: Array.from(existingWords) };
        });
    }
    uploadTranslationsFromList(wordList) {
        return __awaiter(this, void 0, void 0, function* () {
            // Verify csv headers
            const expectedFormat = ["wordInEnglish", "translation", "language", "difficulty"];
            if (wordList[0].toString().toLowerCase().trim() !== expectedFormat.toString().toLowerCase().trim())
                return null;
            const languages = yield this.languageRepository.getAll();
            const difficulties = new Map();
            difficulties.set("EASY", client_1.Difficulty.EASY);
            difficulties.set("MID", client_1.Difficulty.MID);
            difficulties.set("HARD", client_1.Difficulty.HARD);
            let lines = 0;
            const wordsNotFound = new Set();
            const translationWithInvalidLanguages = new Set();
            const translationsWithInvalidDifficulty = new Set();
            for (let i = 1; i < wordList.length; i++) {
                const word = [wordList[i][0].toLowerCase().trim(), wordList[i][1].toLowerCase().trim(), wordList[i][2].toLowerCase().trim(), wordList[i][3].toUpperCase().trim()];
                if (languages.lastIndexOf(word[2]) === -1) {
                    translationWithInvalidLanguages.add(word[1]);
                }
                else if (difficulties.get(word[3]) === undefined) {
                    translationsWithInvalidDifficulty.add(word[1]);
                }
                else if ((yield this.repository.getUniqueWord(word[0])) === null) {
                    wordsNotFound.add(word[0]);
                }
                else {
                    lines++;
                    yield this.repository.createTranslation({ word: word[0], translated: word[1], language: word[2], difficulty: difficulties.get(word[3]) || client_1.Difficulty.EASY });
                }
            }
            return { lines: lines, wordsNotFound: Array.from(wordsNotFound), translationWithInvalidLanguages: Array.from(translationWithInvalidLanguages), translationsWithInvalidDifficulty: Array.from(translationsWithInvalidDifficulty) };
        });
    }
    getWords(translation) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getWords(translation);
        });
    }
    getWordByName(wordInEnglish) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getWordByName(wordInEnglish);
        });
    }
    deleteWord(wordInEnglish) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.deleteWord(wordInEnglish);
        });
    }
    deleteTranslation(translationId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.deleteTranslation(translationId);
        });
    }
    updateWord(oldWord, newWord) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.updateWord(oldWord, newWord);
        });
    }
    getAllWords() {
        return __awaiter(this, void 0, void 0, function* () {
            const words = yield this.repository.getAllWords();
            words.sort((a, b) => { return a.inEnglish.localeCompare(b.inEnglish); });
            return words;
        });
    }
}
exports.WordService = WordService;
