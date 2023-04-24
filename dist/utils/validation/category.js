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
exports.validateCategoryBody = void 0;
const category_repository_1 = require("../../domain/category/category.repository");
const db_1 = require("../db");
const validateCategoryBody = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const categroy = req.body.name;
    if (categroy) {
        if ((yield existsCategoryByName(categroy))) {
            return res.status(400).send("Category already exists");
        }
        next();
        return;
    }
});
exports.validateCategoryBody = validateCategoryBody;
function existsCategoryByName(category) {
    return __awaiter(this, void 0, void 0, function* () {
        const categoryRepository = new category_repository_1.CategoryRepository(db_1.db);
        return yield categoryRepository.getByName(category);
    });
}
