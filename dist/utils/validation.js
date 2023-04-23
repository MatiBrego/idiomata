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
    let word = req.params.word;
    if (word) {
        if (!(yield existsWordInEnglish(word)))
            return res.status(404).send("Word not found");
        next();
        return;
    }
    word = req.body.word;
    if (word) {
        if ((!(yield existsWordInEnglish(word))))
            return res.status(404).send("Word not found");
        next();
        return;
    }
    return res.status(400).send("Word in english missing");
});
exports.validateTranslationBody = validateTranslationBody;
function existsWordInEnglish(inEnglish) {
    return __awaiter(this, void 0, void 0, function* () {
        const wordRepository = new word_repository_1.WordRepository(db_1.db);
        return yield wordRepository.getUniqueWord(inEnglish);
    });
}
