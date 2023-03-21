"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDto = void 0;
class UserDto {
    constructor(user) {
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.language = user.language;
    }
}
exports.UserDto = UserDto;
