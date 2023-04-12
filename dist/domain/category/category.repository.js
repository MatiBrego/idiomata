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
exports.CategoryRepository = void 0;
class CategoryRepository {
    constructor(db) {
        this.db = db;
    }
    create(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryResult = yield this.db.category.create({
                data: category
            });
            return categoryResult;
        });
    }
    delete(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.category.delete({
                where: {
                    name: categoryName
                }
            });
        });
    }
    modify(categoryName, newCategoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.category.update({
                where: {
                    name: categoryName
                },
                data: {
                    name: newCategoryName
                }
            });
        });
    }
}
exports.CategoryRepository = CategoryRepository;