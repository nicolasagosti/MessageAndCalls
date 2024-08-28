"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("../global/HttpException"));
const notFound = (req, res, next) => {
    const exception = new HttpException_1.default(404, `Not found ${req.method} ${req.url}`);
    next(exception);
};
exports.default = notFound;
