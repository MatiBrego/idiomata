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
exports.validateDifficulty = exports.validateLanguage = exports.validateBlanks = void 0;
const word_1 = require("./word");
const validateBlanks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const words = req.body.wordsInEnglish || req.body.blanks;
    let hasInvalidWords = false;
    for (let i = 0; i < words.length; i++) {
        if (!(yield (0, word_1.existsWordByName)(words[i]))) {
            return res.status(404).send("Word not found");
        }
    }
    next();
    return;
});
exports.validateBlanks = validateBlanks;
function validateLanguage(req, res, next) {
    const language = req.body.language;
    if (!language) {
        return res.status(400).send("Language missing");
    }
    next();
    return;
}
exports.validateLanguage = validateLanguage;
function validateDifficulty(req, res, next) {
    const difficulty = req.body.difficulty;
    if (!difficulty) {
        return res.status(400).send("Difficulty missing");
    }
    next();
    return;
}
exports.validateDifficulty = validateDifficulty;
