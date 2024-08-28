import { Request, Response, NextFunction } from "express";
import HttpException from "../global/HttpException";
import logger from "../logger";

const exception = (
    err: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    logger.error(err);
    res.status(404).json({ status: false, error: err.message });
};

export default exception;
