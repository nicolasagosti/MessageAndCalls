import { Request, Response, NextFunction } from "express";
import logger from "../logger";

import AccessToken from "twilio/lib/jwt/AccessToken";
import VoiceResponse from "twilio/lib/twiml/VoiceResponse";

export const GetToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = new AccessToken(
            process.env?.TWILIO_ACCOUNT_SID as string,
            process.env?.TWILIO_API_KEY as string,
            process.env?.TWILIO_SECRET as string,
            { identity: "PH" }
        );
        const VoiceGrant = AccessToken.VoiceGrant;

        const voiceGrant = new VoiceGrant({
            outgoingApplicationSid: process.env?.TWILIO_APP_SID as string,
            incomingAllow: true,
        });

        token.addGrant(voiceGrant);
        logger.info("Getting access token...");
        return res.status(200).json(token.toJwt());
    } catch (error) {
        logger.error(error);
        next(error);
    }
};

export const CallbackCall = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { to } = req.body;

        if (!to)
            return res.status(500).json({ message: "ERROR, to IS MISSING!" });

        let twiml = new VoiceResponse();
        let dial = twiml.dial({
            callerId: process.env?.TWILIO_PHONE_NUMBER as string,
        });
        dial.number(to);

        logger.info(`Dialing ${to}...`);
        res.status(200).json(twiml.toString());
    } catch (error) {
        logger.error(error);
        next(error);
    }
};
