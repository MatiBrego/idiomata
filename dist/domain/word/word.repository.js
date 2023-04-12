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
exports.WordRepository = void 0;
const word_dto_1 = require("./word.dto");
class WordRepository {
    constructor(db) {
        this.db = db;
    }
    // TODO
    getWords(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield [];
        });
    }
    createWord(word) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.word.create({
                data: {
                    inEnglish: word.inEnglish,
                    category: {
                        connect: { name: word.category }
                    }
                }
            });
            return new word_dto_1.WordDto(result);
        });
    }
    createTranslation(translation) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.translation.create({
                data: {
                    translated: translation.translated,
                    difficulty: translation.difficulty,
                    language: { connect: { name: translation.language } },
                    word: { connect: { inEnglish: translation.word } }
                }
            });
            return new word_dto_1.TranslationDto(result);
        });
    }
}
exports.WordRepository = WordRepository;
