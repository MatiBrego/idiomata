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
exports.languageRouter = void 0;
const express_1 = require("express");
const db_1 = require("../../utils/db");
const language_repository_1 = require("./language.repository");
const language_service_1 = require("./language.service");
exports.languageRouter = (0, express_1.Router)();
const languageService = new language_service_1.LanguageService(new language_repository_1.LanguageRepository(db_1.db));
exports.languageRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body;
    const result = yield languageService.createLanguage(language);
    res.json(result);
}));
exports.languageRouter.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.name;
    yield languageService.deleteLanguage(language);
    res.json(language + " was deleted");
}));
exports.languageRouter.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.name;
    const newLanguageName = req.body.newname;
    yield languageService.modifyLanguage(language, newLanguageName);
    res.json(language + " has changed name to " + newLanguageName);
}));
exports.languageRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield languageService.getAll();
    res.status(200).send(response);
}));
