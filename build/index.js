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
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const index_1 = __importDefault(require("./graphql/index"));
const index_2 = __importDefault(require("./services/index"));
const init = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    const PORT = Number(process.env.PORT) | 8000;
    // Create Graphql Server
    const gqlserver = yield (0, index_1.default)();
    app.use("/graphql", (0, express4_1.expressMiddleware)(gqlserver, {
        context: (_a) => __awaiter(void 0, [_a], void 0, function* ({ req }) {
            try {
                console.log("1");
                const token = req.headers["token"];
                if (!token)
                    return {};
                console.log("f", token);
                const decodeToken = yield index_2.default.decodeToken(token);
                console.log("s", decodeToken);
                console.log("2");
                return { decodeToken };
            }
            catch (error) {
                console.log("error", error);
                return {};
            }
        })
    }));
    app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
    });
});
init();
