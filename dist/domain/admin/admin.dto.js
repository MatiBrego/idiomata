"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminLoginInputDto = void 0;
class AdminLoginInputDto {
    constructor(user) {
        this.email = user.email;
        this.password = user.password;
    }
}
exports.AdminLoginInputDto = AdminLoginInputDto;
