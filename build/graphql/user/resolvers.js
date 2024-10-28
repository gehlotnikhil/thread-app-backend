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
exports.resolvers = void 0;
const services_1 = __importDefault(require("../../services"));
const queries = {
    getUserToken: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const res = services_1.default.getUserToken(payload);
        return res;
    }),
    getCurrentUser: (_, parameter, context) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("in", context);
        if (context && context.decodeToken) {
            const user = yield services_1.default.getUserById(context.decodeToken.id);
            console.log({ "user": user });
            return user;
        }
        throw new Error("i don't know who you are");
    })
};
const mutation = {
    createUser: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield services_1.default.createUser(payload);
        return res.id;
    })
};
exports.resolvers = { queries, mutation };
