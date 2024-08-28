"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CallbackCall = exports.GetToken = void 0;
const logger_1 = __importDefault(require("../logger"));
const AccessToken_1 = __importDefault(require("twilio/lib/jwt/AccessToken"));
const VoiceResponse_1 = __importDefault(require("twilio/lib/twiml/VoiceResponse"));
const GetToken = (req, res, next) => {
    var _a, _b, _c, _d;
    try {
        const token = new AccessToken_1.default((_a = process.env) === null || _a === void 0 ? void 0 : _a.TWILIO_ACCOUNT_SID, (_b = process.env) === null || _b === void 0 ? void 0 : _b.TWILIO_API_KEY, (_c = process.env) === null || _c === void 0 ? void 0 : _c.TWILIO_SECRET, { identity: "PH" });
        const VoiceGrant = AccessToken_1.default.VoiceGrant;
        const voiceGrant = new VoiceGrant({
            outgoingApplicationSid: (_d = process.env) === null || _d === void 0 ? void 0 : _d.TWILIO_APP_SID,
            incomingAllow: true,
        });
        token.addGrant(voiceGrant);
        logger_1.default.info("Getting access token...");
        return res.status(200).json(token.toJwt());
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
};
exports.GetToken = GetToken;
const CallbackCall = (req, res, next) => {
    var _a;
    try {
        const { to } = req.body;
        if (!to)
            return res.status(500).json({ message: "ERROR, to IS MISSING!" });
        let twiml = new VoiceResponse_1.default();
        let dial = twiml.dial({
            callerId: (_a = process.env) === null || _a === void 0 ? void 0 : _a.TWILIO_PHONE_NUMBER,
        });
        dial.number(to);
        logger_1.default.info(`Dialing ${to}...`);
        res.status(200).json(twiml.toString());
    }
    catch (error) {
        logger_1.default.error(error);
        next(error);
    }
};
exports.CallbackCall = CallbackCall;
