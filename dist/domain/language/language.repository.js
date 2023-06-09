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
exports.LanguageRepository = void 0;
const language_dto_1 = require("./language.dto");
class LanguageRepository {
    constructor(db) {
        this.db = db;
    }
    create(language) {
        return __awaiter(this, void 0, void 0, function* () {
            const languageResult = yield this.db.language.create({
                data: language
            });
            return languageResult;
        });
    }
    delete(languageName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.language.delete({
                where: {
                    name: languageName
                }
            });
        });
    }
    modify(languageName, newLanguageName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.language.update({
                where: {
                    name: languageName
                },
                data: {
                    name: newLanguageName
                }
            });
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.db.language.findMany({});
            return response.map((json) => { return json.name; });
        });
    }
    getByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const language = yield this.db.language.findUnique({
                where: { name: name }
            });
            return language ? new language_dto_1.LanguageDto(language) : null;
        });
    }
}
exports.LanguageRepository = LanguageRepository;
