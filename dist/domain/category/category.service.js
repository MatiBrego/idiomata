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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const fs_1 = __importDefault(require("fs"));
class CategoryService {
    constructor(repository) {
        this.repository = repository;
    }
    createCategory(category, file) {
        return __awaiter(this, void 0, void 0, function* () {
            if (file) {
                fs_1.default.writeFile(__dirname + '/categoryImages/' + category.imgPath, file.buffer, (err) => { console.log(err); });
                const newCategory = { name: category.name, imgPath: "categoryImages/" + category.imgPath };
                return yield this.repository.create(newCategory);
            }
            else {
                return yield this.repository.create(category);
            }
        });
    }
    deleteCategory(categoryName) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.delete(categoryName);
        });
    }
    modifyCategory(categoryName, newCategoryName, newFile) {
        return __awaiter(this, void 0, void 0, function* () {
            if (newFile) {
                fs_1.default.writeFile(__dirname + '/categoryImages/' + newFile, newFile.buffer, (err) => { console.log(err); });
                return yield this.repository.modify(categoryName, newCategoryName, "categoryImages/" + newFile.originalname);
            }
            else {
                return yield this.repository.modify(categoryName, newCategoryName, undefined);
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getAll();
        });
    }
    getImageByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.getImageByName(name);
        });
    }
}
exports.CategoryService = CategoryService;
