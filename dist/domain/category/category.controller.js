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
exports.categoryRouter = void 0;
const express_1 = require("express");
const db_1 = require("../../utils/db");
const category_repository_1 = require("./category.repository");
const category_service_1 = require("./category.service");
const category_1 = require("../../utils/validation/category");
const multer_1 = __importDefault(require("multer"));
exports.categoryRouter = (0, express_1.Router)();
const categoryService = new category_service_1.CategoryService(new category_repository_1.CategoryRepository(db_1.db));
exports.categoryRouter.post('/', (0, multer_1.default)().single("file"), category_1.validateCategoryBody, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.body;
    const img = req.file;
    const result = yield categoryService.createCategory({ name: category.name, imgPath: img === null || img === void 0 ? void 0 : img.originalname }, img);
    res.json(result);
}));
exports.categoryRouter.delete('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.body.name;
    yield categoryService.deleteCategory(category);
    res.send(category + " was deleted");
}));
exports.categoryRouter.put('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.body.name;
    const modcategory = req.body.new_name;
    yield categoryService.modifyCategory(category, modcategory);
    res.send(category + ' has changed name to ' + modcategory);
}));
exports.categoryRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield categoryService.getAll();
    res.status(200).send(response);
}));
exports.categoryRouter.get('/images/:name', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield categoryService.getImageByName(req.params.name);
    if (response) {
        res.status(200).sendFile(__dirname + '/' + response);
    }
    else {
        res.status(404);
    }
}));
