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
exports.validateLanguageBody = void 0;
const language_repository_1 = require("../../domain/language/language.repository");
const db_1 = require("../db");
const validateLanguageBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const language = req.body.name;
    if (language) {
        if (yield (existsLanguageByName(language))) {
            return res.status(400).send("Language already exists");
        }
        next();
        return;
    }
});
exports.validateLanguageBody = validateLanguageBody;
function existsLanguageByName(language) {
    return __awaiter(this, void 0, void 0, function* () {
        const languageRepository = new language_repository_1.LanguageRepository(db_1.db);
        return yield languageRepository.getByName(language);
    });
}
