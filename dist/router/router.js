"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_controller_1 = require("../domain/user/user.controller");
exports.router = (0, express_1.Router)();
exports.router.use('/user', user_controller_1.userRouter);
