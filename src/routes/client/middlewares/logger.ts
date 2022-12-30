import * as express from 'express';
import {Logger} from "../../../helper/logger";
const logger = new Logger('Client Request','Sever')
export function loggerClient(request: express.Request, response: express.Response, next) {
    logger.info(`${request.method} ${request.path}`);
    next();
}
