import { Request, Response, NextFunction } from "express";
import logger from "../logger";

export const SendMessage = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const client = require("twilio")(
            process.env?.TWILIO_ACCOUNT_SID as string,
            process.env?.TWILIO_AUTH_TOKEN as string
        );

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
                logger.info(`Successfully sent ${body} to ${to}`);
            })
            .catch((err: Error) => {
                logger.error(err);
            });

        return res.status(200).json({ message: "Message sent successfully!" });
    } catch (error) {
        logger.error(error);
        next(error);
    }
};
