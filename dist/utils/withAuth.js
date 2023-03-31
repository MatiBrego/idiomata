"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAuth = void 0;
const jwt_simple_1 = __importDefault(require("jwt-simple"));
function withAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res
            .status(403)
            .send({ message: "Authorization header missing" });
    }
    try {
        var token = req.headers.authorization.split(" ")[1];
        var payload = jwt_simple_1.default.decode(token, "SuperSecretPassword");
    }
    catch (error) {
        return res.status(401).send({ message: "Invalid Token" });
    }
    res.locals.context = payload.sub;
    next();
}
exports.withAuth = withAuth;
