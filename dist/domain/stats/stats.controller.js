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
exports.statsRouter = void 0;
const express_1 = require("express");
const stats_service_1 = require("./stats.service");
const stats_repository_1 = require("./stats.repository");
const db_1 = require("../../utils/db");
const auth_1 = require("../../utils/auth");
const user_service_1 = require("../user/user.service");
const user_repository_1 = require("../user/user.repository");
const request_repository_1 = require("../request/request.repository");
const statsService = new stats_service_1.StatsService(new stats_repository_1.StatsRepository(db_1.db));
const userService = new user_service_1.UserService(new user_repository_1.UserRepository(db_1.db), new request_repository_1.RequestRepository(db_1.db));
exports.statsRouter = (0, express_1.Router)();
// Endpoint to save a word attempt by a user.
exports.statsRouter.post('/wordAttempt', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    data.userId = res.locals.context;
    const attempt = yield statsService.createWordAttempt(data);
    res.status(200).json(attempt);
}));
// Enpoint to get all attempts made by a user. QueryParams must have language, may have category and difficulty
exports.statsRouter.get('/wordAttempt', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.query;
    const userId = res.locals.context;
    const attempts = yield statsService.getWordAttemptsByUserId(userId, data);
    res.status(200).json(attempts);
}));
//Returns wordAttempts with the quantity of errors made in each word, in descending order 
exports.statsRouter.get('/wordAttempt/errorsByWord', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.query;
    const userId = res.locals.context;
    const attempts = yield statsService.getAttemptsByWord(userId, data);
    res.status(200).json(attempts);
}));
// Enpoint to get all attempts made by a user's ID. QueryParams must have language, may have category and difficulty
exports.statsRouter.get('/wordAttemptById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.query;
    const userId = data.userId;
    const userData = yield userService.getUserById(Number(userId));
    const attempts = yield statsService.getWordAttemptsByUserId(Number(userId), { language: (userData === null || userData === void 0 ? void 0 : userData.language) ? userData.language : undefined });
    res.status(200).json(attempts);
}));
//Returns wordAttempts with the quantity of errors made in each word, in descending order by user's ID
exports.statsRouter.get('/wordAttempt/errorsByWordById', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.query;
    const userId = data.userId;
    const userData = yield userService.getUserById(Number(userId));
    const attempts = yield statsService.getAttemptsByWord(Number(userId), { language: (userData === null || userData === void 0 ? void 0 : userData.language) ? userData.language : undefined });
    res.status(200).json(attempts);
}));
exports.statsRouter.post('/memotest/attempt', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const timeInSeconds = req.body.timeInSeconds;
    const userId = res.locals.context;
    const attempt = yield statsService.createMemotestAttempt(userId, timeInSeconds);
    res.status(200).json(attempt);
}));
exports.statsRouter.get('/memotest/bestTime', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.context;
    const attempt = yield statsService.getMemotestAttemptByUserId(userId);
    res.status(200).json(attempt);
}));
