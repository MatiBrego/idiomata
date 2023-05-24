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
exports.SentenceRepository = void 0;
const sentence_dto_1 = require("./sentence.dto");
class SentenceRepository {
    constructor(db) {
        this.db = db;
    }
    //TODO blanks must return translations too
    createSentence(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            var parts = [];
            for (let i = 0; i < sentence.parts.length; i++) {
                const partContent = sentence.parts[i];
                parts.push({ position: i, content: partContent });
            }
            var blanks = [];
            for (let i = 0; i < sentence.wordsInEnglish.length; i++) {
                const blankWord = sentence.wordsInEnglish[i];
                blanks.push({ position: i, word: { connect: { inEnglish: blankWord } } });
            }
            const result = yield this.db.sentence.create({
                data: {
                    language: { connect: { name: sentence.language } },
                    difficulty: sentence.difficulty,
                    parts: { create: parts },
                    blanks: { create: blanks }
                },
                select: {
                    id: true,
                    language: { select: { name: true } },
                    difficulty: true,
                    parts: true,
                    blanks: { select: { word: { select: { inEnglish: true } } } }
                }
            });
            return new sentence_dto_1.SentenceDto({ id: result.id, language: result.language.name, difficulty: result.difficulty, blanks: result.blanks.map((blank) => { return blank.word.inEnglish; }), parts: result.parts.map((part) => { return part.content; }) });
        });
    }
    deleteSentenceById(sentenceId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.sentence.delete({
                where: {
                    id: sentenceId
                }
            });
        });
    }
    getSentences(searchLanguage) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.sentence.findMany({
                where: {
                    language: { name: searchLanguage }
                },
                select: {
                    id: true,
                    parts: true,
                    blanks: { select: { word: { select: { inEnglish: true, translations: { where: { language: { name: searchLanguage } }, select: { translated: true } } } } }, orderBy: { position: "asc" } }
                }
            });
            const blanks = [];
            result.forEach((sentence) => {
                const sentenceBlanks = [];
                sentence.blanks.forEach((blank) => {
                    const array = [];
                    array.push(blank.word.inEnglish);
                    blank.word.translations.forEach((translation) => {
                        array.push(translation.translated);
                    });
                    sentenceBlanks.push(array);
                });
                blanks.push(sentenceBlanks);
            });
            return result.map((sentence, i) => { return { id: sentence.id, parts: sentence.parts, blanks: blanks[i] }; });
        });
    }
}
exports.SentenceRepository = SentenceRepository;
