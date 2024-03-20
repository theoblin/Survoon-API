"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
exports.User = (0, common_1.createParamDecorator)((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    if (!!req.user) {
        return !!data ? req.user[data] : req.user;
    }
    const token = req.headers?.authorization ? req.headers.authorization.split(' ') : null;
    if (token?.[1]) {
        const decoded = jsonwebtoken_1.default.verify(token[1], config_1.SECRET);
        console.log(decoded);
        return !!data ? decoded[data] : decoded.user;
    }
});
//# sourceMappingURL=user.decorator.js.map