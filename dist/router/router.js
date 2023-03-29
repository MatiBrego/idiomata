"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../domain/auth/auth.controller");
const user_controller_1 = require("../domain/user/user.controller");
exports.router = (0, express_1.Router)();
exports.router.use('/user', user_controller_1.userRouter);
exports.router.use('/auth', auth_controller_1.authRouter);
