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
exports.sentenceRouter = void 0;
const express_1 = require("express");
const sentence_service_1 = require("./sentence.service");
const sentence_repository_1 = require("./sentence.repository");
const db_1 = require("../../utils/db");
const sentence_1 = require("../../utils/validation/sentence");
const sentenceService = new sentence_service_1.SentenceService(new sentence_repository_1.SentenceRepository(db_1.db));
exports.sentenceRouter = (0, express_1.Router)();
exports.sentenceRouter.post("/", sentence_1.validateBlanks, sentence_1.validateLanguage, sentence_1.validateDifficulty, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const sentence = yield sentenceService.createSentence(data);
    res.status(200).json(sentence);
}));
exports.sentenceRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.query.language;
    let difficulty = req.query.difficulty;
    if (difficulty.length === 0) {
        difficulty = undefined;
    }
    const result = yield sentenceService.getSentencesByLanguage(language, difficulty);
    res.status(200).json(result);
}));
exports.sentenceRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sentenceId = req.params.id;
    yield sentenceService.deleteSentenceById(Number(sentenceId));
    res.status(200).send("Sentence deleted");
}));
exports.sentenceRouter.put("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sentence = req.body;
    yield sentenceService.updateSentence(sentence);
    res.status(200).send("Sentence updated");
}));
