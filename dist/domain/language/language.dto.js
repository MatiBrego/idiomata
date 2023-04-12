"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageInputDto = exports.LanguageDto = void 0;
class LanguageDto {
    constructor(language) {
        this.id = language.id;
        this.name = language.name;
    }
}
exports.LanguageDto = LanguageDto;
//This one is the one we get from the http
class LanguageInputDto {
    constructor(language) {
        this.name = language.name;
    }
}
exports.LanguageInputDto = LanguageInputDto;
