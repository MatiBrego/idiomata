"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInputDto = exports.UserDto = void 0;
class UserDto {
    constructor(user) {
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.language = user.language;
    }
}
exports.UserDto = UserDto;
class UserInputDto {
    constructor(user) {
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.language = user.language;
    }
}
exports.UserInputDto = UserInputDto;
