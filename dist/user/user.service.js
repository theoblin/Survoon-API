"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const config_2 = require("../config");
let UserService = class UserService {
    constructor(configService) {
        this.configService = configService;
    }
    async getOneUserById(id) {
        return 'getOneUserById';
    }
    async getOneUserByEmail(email) {
        return 'getOneUserByEmail';
    }
    async updateOneUser(id, dto) {
        return 'updateOneUser';
    }
    async createOneUser(dto) {
        return this.generateJWT({ "email": "test@gmail.com", "id": 1 });
    }
    async deleteById(id) {
        return 'deleteById';
    }
    async deleteByEmail(email) {
        return 'deleteByEmail';
    }
    async loginUser() {
        return 'loginUser';
    }
    generateJWT(user) {
        const today = new Date();
        const exp = new Date(today);
        exp.setDate(today.getDate() + 60);
        return jsonwebtoken_1.default.sign({
            email: "test@gmail.com",
            exp: exp.getTime() / 1000,
            id: "id",
        }, config_2.SECRET);
    }
    buildUserRO(user) {
        const userRO = {
            email: user.email,
            token: this.generateJWT(user),
        };
        return { user: userRO };
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map