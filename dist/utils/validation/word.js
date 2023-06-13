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
exports.validateWordUpdateBody = exports.existsWordByName = exports.validateWordBody = void 0;
const db_1 = require("../db");
const word_repository_1 = require("../../domain/word/word.repository");
const validateWordBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const word = req.body.inEnglish;
    if (word) {
        if ((yield existsWordByName(word))) {
            return res.status(400).send("Word already exists");
        }
        next();
        return;
    }
});
exports.validateWordBody = validateWordBody;
function existsWordByName(word) {
    return __awaiter(this, void 0, void 0, function* () {
        const wordRepository = new word_repository_1.WordRepository(db_1.db);
        return yield wordRepository.getUniqueWord(word);
    });
}
exports.existsWordByName = existsWordByName;
const validateWordUpdateBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const oldWord = req.body.oldWord;
    const newWord = req.body.newWord;
    if (oldWord) {
        if (!(yield existsWordByName(oldWord))) {
            return res.status(400).send("Word does not exist");
        }
    }
    if (newWord) {
        if ((yield existsWordByName(newWord))) {
            return res.status(400).send("Word already exists");
        }
        next();
        return;
    }
});
exports.validateWordUpdateBody = validateWordUpdateBody;
