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
exports.wordRouter = void 0;
const express_1 = require("express");
const word_service_1 = require("./word.service");
const word_repository_1 = require("./word.repository");
const db_1 = require("../../utils/db");
exports.wordRouter = (0, express_1.Router)();
const wordService = new word_service_1.WordService(new word_repository_1.WordRepository(db_1.db));
// Endpoint to create a word
exports.wordRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const wordCreated = yield wordService.createWord(data);
    res.status(200).json(wordCreated);
}));
// Endpoint to add a translation
exports.wordRouter.post("/translation", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const translationCreated = yield wordService.addTranslation(data);
    res.status(200).json(translationCreated);
}));
// Endpoint to get a word
exports.wordRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const words = yield wordService.getWords(data);
    console.log(words);
    res.status(200).send(words);
}));