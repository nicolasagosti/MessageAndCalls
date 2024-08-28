"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessage = void 0;
const logger_1 = __importDefault(require("../logger"));
const SendMessage = (req, res, next) => {
    var _a, _b;
    try {
        const client = require("twilio")((_a = process.env) === null || _a === void 0 ? void 0 : _a.TWILIO_ACCOUNT_SID, (_b = process.env) === null || _b === void 0 ? void 0 : _b.TWILIO_AUTH_TOKEN);
        const { message: body, receiverNumber: to } = req.body;
        if (!body)
            return res.status(500).json({ message: "ERROR, BODY IS MISSING!" });
        if (!to)
            return res.status(500).json({ message: "ERROR, TO IS MISSING!" });
        client.messages
            .create({
            from: process.env.TWILIO_PHONE_NUMBER,
            to,
            body,
        })
            .then(() => {
            logger_1.default.info(`Successfully sent ${body} to ${to}`);
        })
            .catch((err) => {
            logger_1.default.error(err);
        });
        return res.status(200).json({ message: "Message sent successfully!" });
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
};
exports.SendMessage = SendMessage;
