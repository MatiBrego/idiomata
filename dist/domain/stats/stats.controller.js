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
const statsService = new stats_service_1.StatsService(new stats_repository_1.StatsRepository(db_1.db));
exports.statsRouter = (0, express_1.Router)();
// Endpoint to save a word attempt by a user.
exports.statsRouter.post('/wordAttempt', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const attempt = yield statsService.createWordAttempt(data);
    res.status(200).json(attempt);
}));
// Enpoint to get all attempts made by a user. Body may have language, category and difficulty
exports.statsRouter.get('/wordAttempt', auth_1.withAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const userId = res.locals.context;
    const attempts = yield statsService.getWordAttemptsByUserId(userId, data);
    res.status(200).json(attempts);
}));
