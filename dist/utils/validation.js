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
exports.validateTranslationBody = void 0;
const word_repository_1 = require("../domain/word/word.repository");
const db_1 = require("./db");
const validateTranslationBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const word = req.params.word;
    const wordRepository = new word_repository_1.WordRepository(db_1.db);
    const result = yield wordRepository.getUniqueWord(word);
    if (!result)
        return res.status(404).send("Word not found");
    next();
});
exports.validateTranslationBody = validateTranslationBody;
