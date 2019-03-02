"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HandlerData {
    constructor(path, queryStringObject, method, header, payload) {
        this.path = path;
        this.queryStringObject = queryStringObject;
        this.method = method;
        this.header = header;
        this.payload = payload;
    }
}
exports.default = HandlerData;
