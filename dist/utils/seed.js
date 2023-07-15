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
        const languagesId = yield createLanguages();
        createUsers();
        const categoryIds = yield createCategories();
        const wordsId = yield createWords(categoryIds);
        createTranslations(wordsId, languagesId);
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
        return languagesId;
    });
}
function createCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        const home = yield db_1.db.category.create({
            data: { name: "home" }
        });
        const school = yield db_1.db.category.create({
            data: { name: "school" }
        });
        return [home.id, school.id];
    });
}
function createWords(categoryIds) {
    return __awaiter(this, void 0, void 0, function* () {
        const wordsId = [];
        wordsId.push(yield db_1.db.word.create({ data: { inEnglish: "chair", categoryId: categoryIds[0] } }));
        wordsId.push(yield db_1.db.word.create({ data: { inEnglish: "bathroom", categoryId: categoryIds[0] } }));
        wordsId.push(yield db_1.db.word.create({ data: { inEnglish: "desk", categoryId: categoryIds[0] } }));
        wordsId.push(yield db_1.db.word.create({ data: { inEnglish: "window", categoryId: categoryIds[0] } }));
        wordsId.push(yield db_1.db.word.create({ data: { inEnglish: "door", categoryId: categoryIds[0] } }));
        wordsId.push(yield db_1.db.word.create({ data: { inEnglish: "pencil", categoryId: categoryIds[1] } }));
        wordsId.push(yield db_1.db.word.create({ data: { inEnglish: "blackboard", categoryId: categoryIds[1] } }));
        wordsId.push(yield db_1.db.word.create({ data: { inEnglish: "teacher", categoryId: categoryIds[1] } }));
        wordsId.push(yield db_1.db.word.create({ data: { inEnglish: "student", categoryId: categoryIds[1] } }));
        wordsId.push(yield db_1.db.word.create({ data: { inEnglish: "schoolbag", categoryId: categoryIds[1] } }));
        return wordsId.map((word) => word.id);
    });
}
function createTranslations(wordsId, languagesId) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.db.translation.create({ data: { wordId: wordsId[0], translated: "silla", languageId: languagesId[0], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[0], translated: "sedia", languageId: languagesId[1], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[1], translated: "baño", languageId: languagesId[0], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[1], translated: "bagno", languageId: languagesId[1], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[2], translated: "escritorio", languageId: languagesId[0], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[2], translated: "scrivania", languageId: languagesId[1], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[3], translated: "ventana", languageId: languagesId[0], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[3], translated: "finestra", languageId: languagesId[1], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[4], translated: "puerta", languageId: languagesId[0], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[4], translated: "porta", languageId: languagesId[1], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[5], translated: "lápiz", languageId: languagesId[0], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[5], translated: "matita", languageId: languagesId[1], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[6], translated: "pizarra", languageId: languagesId[0], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[6], translated: "lavagna", languageId: languagesId[1], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[7], translated: "profesor", languageId: languagesId[0], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[7], translated: "insegnante", languageId: languagesId[1], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[8], translated: "estudiante", languageId: languagesId[0], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[8], translated: "studente", languageId: languagesId[1], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[9], translated: "mochila", languageId: languagesId[0], difficulty: "EASY" } });
        yield db_1.db.translation.create({ data: { wordId: wordsId[9], translated: "zaino", languageId: languagesId[1], difficulty: "EASY" } });
    });
}
