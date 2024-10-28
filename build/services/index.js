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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_crypto_1 = require("node:crypto");
const db_1 = require("../lib/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "abc@123%xyz";
class UserService {
    static generateHashPassword(salt, password) {
        const hashPassword = (0, node_crypto_1.createHmac)("sha256", salt)
            .update(password)
            .digest("hex");
        return hashPassword;
    }
    static createUser(payload) {
        const { firstName, lastName, email, password } = payload;
        // database might not be able to read salt so we are
        // specifying it that it is hex thing
        const salt = (0, node_crypto_1.randomBytes)(32).toString("hex");
        const hashPassword = UserService.generateHashPassword(salt, password);
        return db_1.prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashPassword,
                salt,
            },
        });
    }
    static getUserToken(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = payload;
            const res = yield db_1.prismaClient.user.findUnique({ where: { email } });
            if (!res)
                throw new Error("User not found");
            const salt = res.salt;
            const hashPassword = UserService.generateHashPassword(salt, password);
            if (hashPassword !== res.password)
                throw new Error("Password is incorrect");
            const token = jsonwebtoken_1.default.sign({ "email": email }, JWT_SECRET);
            return token;
        });
    }
}
exports.default = UserService;
