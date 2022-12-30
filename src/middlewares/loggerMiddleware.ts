import * as express from 'express';
import {Logger} from "../helper/logger";
const logger = new Logger('App Travel','Sever')

export function loggerMiddleware(request: express.Request, response: express.Response, next) {
    logger.info(`${request.method} ${request.path}`);
    next();
}
