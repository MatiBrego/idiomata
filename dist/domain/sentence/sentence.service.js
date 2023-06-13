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
exports.SentenceService = void 0;
class SentenceService {
    constructor(sentenceRepository) {
        this.sentenceRepository = sentenceRepository;
    }
    createSentence(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sentenceRepository.createSentence(input);
        });
    }
    getSentencesByLanguage(language) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sentenceRepository.getSentences(language);
        });
    }
    deleteSentenceById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.sentenceRepository.deleteSentenceById(id);
        });
    }
    updateSentence(sentence) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sentenceRepository.deleteSentenceById(sentence.id);
            console.log(sentence);
            return yield this.sentenceRepository.createSentence({ language: sentence.language, parts: sentence.parts, wordsInEnglish: sentence.blanks, difficulty: sentence.difficulty });
        });
    }
}
exports.SentenceService = SentenceService;
