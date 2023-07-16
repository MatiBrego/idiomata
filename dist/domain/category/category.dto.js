"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryInputDto = exports.CategoryDto = void 0;
class CategoryDto {
    constructor(category) {
        this.id = category.id;
        this.name = category.name;
        this.imgPath = category.imgPath;
    }
}
exports.CategoryDto = CategoryDto;
class CategoryInputDto {
    constructor(category) {
        this.name = category.name;
        this.imgPath = category.imgPath;
    }
}
exports.CategoryInputDto = CategoryInputDto;
