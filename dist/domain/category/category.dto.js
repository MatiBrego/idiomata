"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryInputDto = exports.CategoryDto = void 0;
class CategoryDto {
    constructor(category) {
        this.id = category.id;
        this.name = category.name;
    }
}
exports.CategoryDto = CategoryDto;
class CategoryInputDto {
    constructor(category) {
        this.name = category.name;
    }
}
exports.CategoryInputDto = CategoryInputDto;
