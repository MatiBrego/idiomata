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
exports.resetDb = void 0;
const db_1 = require("./db");
function resetDb() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.category.deleteMany();
        yield db_1.db.language.deleteMany();
        yield db_1.db.translation.deleteMany();
        yield db_1.db.user.deleteMany();
        yield db_1.db.word.deleteMany();
        yield db_1.db.wordAttempt.deleteMany();
        createUsers();
        // createLanguages()
        // createCategories()
        // createWords()
        // createTranslations()
    });
}
exports.resetDb = resetDb;
//Creates 5 users who have:
// name: useri  password: 1  email: useri@gmail.com  lannguage: spanish
function createUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 1; i < 6; i++) {
            yield db_1.db.user.create({
                data: {
                    name: "user" + i,
                    password: String(i),
                    email: "user" + i + "@gmail.com",
                    language: "spanish"
                }
            });
        }
        yield db_1.db.user.update({
            where: { email: "user1@gmail.com" },
            data: {
                isAdmin: true
            }
        });
    });
}
