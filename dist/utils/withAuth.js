"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAuth = exports.validTokens = void 0;
const jwt_simple_1 = __importDefault(require("jwt-simple"));
//Save the tokens that are created to this list, in order to remove them if user logs out
exports.validTokens = new Set();
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
    //If token is not on the list, it is not valid
    if (!exports.validTokens.has(token)) {
        return res.status(403).send({ message: "Token no longer valid" });
    }
    res.locals.context = payload.sub;
    next();
}
exports.withAuth = withAuth;
