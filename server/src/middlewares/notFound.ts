import { Request, Response, NextFunction } from "express";
import HttpException from "../global/HttpException";

const notFound = (req: Request, res: Response, next: NextFunction) => {
    const exception: HttpException = new HttpException(
        404,
        `Not found ${req.method} ${req.url}`
    );
    next(exception);
};

export default notFound;
