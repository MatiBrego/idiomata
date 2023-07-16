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
        yield db_1.db.sentence.deleteMany();
        const languagesId = yield createLanguages();
        createUsers();
        yield createCategories();
    });
}
exports.resetDb = resetDb;
//Creates 5 users who have:
// name: useri  password: i  email: useri@gmail.com  lannguage: spanish
function createUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 1; i < 6; i++) {
            yield db_1.db.user.create({
                data: {
                    name: "user" + i,
                    password: String(i),
                    email: "user" + i + "@gmail.com",
                    language: { connect: { name: "spanish" } }
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
function createLanguages() {
    return __awaiter(this, void 0, void 0, function* () {
        const languagesId = [];
        languagesId.push((yield db_1.db.language.create({ data: { name: 'spanish' } })).id);
        languagesId.push((yield db_1.db.language.create({ data: { name: 'italian' } })).id);
        languagesId.push((yield db_1.db.language.create({ data: { name: 'french' } })).id);
        return languagesId;
    });
}
function createCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.category.create({
            data: { name: "home" }
        });
        yield db_1.db.category.create({
            data: { name: "school" }
        });
        yield db_1.db.category.create({
            data: { name: "food" }
        });
        yield db_1.db.category.create({
            data: { name: "vehicle" }
        });
        yield db_1.db.category.create({
            data: { name: "technology" }
        });
        yield db_1.db.category.create({
            data: { name: "music" }
        });
        yield db_1.db.category.create({
            data: { name: "kitchen" }
        });
        yield db_1.db.category.create({
            data: { name: "clothing" }
        });
        yield db_1.db.category.create({
            data: { name: "nature" }
        });
        yield db_1.db.category.create({
            data: { name: "celestial" }
        });
        yield db_1.db.category.create({
            data: { name: "communication" }
        });
        yield db_1.db.category.create({
            data: { name: "sports" }
        });
        yield db_1.db.category.create({
            data: { name: "flower" }
        });
        yield db_1.db.category.create({
            data: { name: "furniture" }
        });
        yield db_1.db.category.create({
            data: { name: "geography" }
        });
        yield db_1.db.category.create({
            data: { name: "animal" }
        });
        yield db_1.db.category.create({
            data: { name: "movie" }
        });
        yield db_1.db.category.create({
            data: { name: "beverage" }
        });
    });
}
