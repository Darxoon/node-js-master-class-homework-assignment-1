"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers_1 = require("./handlers");
exports.router = {
    'ping': handlers_1.handlers.ping,
    'hello': handlers_1.handlers.hello
};
