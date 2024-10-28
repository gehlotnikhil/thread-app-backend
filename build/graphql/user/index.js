"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mutation_1 = require("./mutation");
const query_1 = require("./query");
const resolvers_1 = require("./resolvers");
const typedef_1 = require("./typedef");
exports.User = { typeDefs: typedef_1.typeDefs, query: query_1.query, mutation: mutation_1.mutation, resolvers: resolvers_1.resolvers };
