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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordRouter = void 0;
const express_1 = require("express");
const word_service_1 = require("./word.service");
const word_repository_1 = require("./word.repository");
const db_1 = require("../../utils/db");
const translation_1 = require("../../utils/validation/translation");
const word_1 = require("../../utils/validation/word");
const multer_1 = __importDefault(require("multer"));
const parse_1 = require("../../utils/parse");
const category_repository_1 = require("../category/category.repository");
const language_repository_1 = require("../language/language.repository");
exports.wordRouter = (0, express_1.Router)();
const wordService = new word_service_1.WordService(new word_repository_1.WordRepository(db_1.db), new category_repository_1.CategoryRepository(db_1.db), new language_repository_1.LanguageRepository(db_1.db));
// Endpoint to create a word
exports.wordRouter.post("/", word_1.validateWordBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const wordCreated = yield wordService.createWord(data);
    res.status(200).json(wordCreated);
}));
exports.wordRouter.post("/upload", (0, multer_1.default)().single("file"), parse_1.parseFileToCsv, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wordList = req.body;
    const result = yield wordService.uploadWordsFromList(wordList);
    if (result === null) {
        return res.status(400).json("Csv format must be: 'word,category'");
    }
    res.status(200).json(result);
}));
// Endpoint to add a translation
exports.wordRouter.post("/translation", translation_1.validateTranslationBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const translationCreated = yield wordService.addTranslation(data);
    res.status(200).json(translationCreated);
}));
exports.wordRouter.post("/upload/translations", (0, multer_1.default)().single("file"), parse_1.parseFileToCsv, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wordList = req.body;
    const result = yield wordService.uploadTranslationsFromList(wordList);
    if (result === null) {
        return res.status(400).json("Csv format must be: 'wordInEnglish, translation, language, difficulty'");
    }
    res.status(200).json(result);
}));
// Endpoint to get many words. Body must have language; can have category and difficulty
exports.wordRouter.post("/wordlist", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const words = yield wordService.getWords(data);
    res.status(200).send(words);
}));
exports.wordRouter.get("/translation/:word", translation_1.validateTranslationBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wordInEnglish = req.params.word;
    const translations = yield wordService.getWordByName(wordInEnglish);
    res.status(200).send(translations);
}));
exports.wordRouter.delete("/", translation_1.validateTranslationBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const wordInEnglish = req.body.inEnglish;
    yield wordService.deleteWord(wordInEnglish);
    res.status(200).json(wordInEnglish + " was deleted");
}));
exports.wordRouter.delete("/translation", translation_1.validateTranslationBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const translationId = req.body.id;
    yield wordService.deleteTranslation(translationId);
    res.status(200).json("Translation with id " + translationId + " was deleted");
}));
exports.wordRouter.post("/update", word_1.validateWordUpdateBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const oldWord = req.body.oldWord;
    const newWord = req.body.newWord;
    yield wordService.updateWord(oldWord, newWord);
    res.status(200).send("Word updated");
}));
exports.wordRouter.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const words = yield wordService.getAllWords();
    res.status(200).json(words);
}));
