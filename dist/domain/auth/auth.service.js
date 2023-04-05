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
exports.AuthService = void 0;
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const moment_1 = __importDefault(require("moment"));
const auth_1 = require("../../utils/auth");
class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    loginUser(loginInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userService.getUserByEmail(loginInput.email);
            if (user && loginInput.password == user.password) {
                return user;
            }
            return null;
        });
    }
    generateToken(user) {
        var payload = {
            sub: user.id,
            iat: (0, moment_1.default)().unix(),
            exp: (0, moment_1.default)().add(1, "days").unix(),
        };
        const token = jwt_simple_1.default.encode(payload, "SuperSecretPassword");
        auth_1.validTokens.add(token); //Add token to token list
        return token;
    }
    loginAdmin(adminLoginInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const admin = yield this.userService.getAdminByEmail(adminLoginInput.email);
            if (admin && adminLoginInput.password == admin.password) {
                return admin;
            }
            return null;
        });
    }
}
exports.AuthService = AuthService;
