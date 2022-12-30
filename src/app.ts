import express from "express";
import * as bodyParser from "body-parser"
import * as mongoose from 'mongoose';
import {loggerMiddleware} from "./middlewares/loggerMiddleware";
import {Logger} from './helper/logger'
require('dotenv').config({path: `${__dirname}/.env`});
const logger = new Logger('Travel','Database')
class App {
    public app: express.Application
    public port: number
    constructor(controllers,port){
        this.app = express()
        this.port = port
        this.initializeMiddlewares()
        this.initializeControllers(controllers)
        this.connectToTheDatabase()
    }
    private initializeMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(loggerMiddleware)
    }
    private initializeControllers(controllers) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);8
        });
    }
    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
    private connectToTheDatabase() {
        const {MONGO_PATH} = process.env
        mongoose.connect(`${MONGO_PATH}`).then(()=>{
            logger.info('Connect database successfully')
        });
    }
}
export default App
