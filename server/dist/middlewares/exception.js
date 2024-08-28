"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = __importDefault(require("../logger"));
const exception = (err, req, res, next) => {
    logger_1.default.error(err);
    res.status(404).json({ status: false, error: err.message });
};
exports.default = exception;
