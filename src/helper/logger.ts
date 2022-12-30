import winston , {transport} from 'winston';
const {format} = winston
const { combine, timestamp, label, printf, prettyPrint } = format;
const CATEGORY = "winston custom format";

const customLevels = {
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0,
    },
    colors: {
        trace: 'white',
        debug: 'green',
        info: 'green',
        warn: 'yellow',
        error: 'red',
        fatal: 'red',
    },
};
const formatter = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.splat(),
   winston.format.prettyPrint()
);
const metaInfo = {
    serviceContext: {
        service: 'serviceName',
        version: 1.0
    },
    labels: {
        service: 'serviceName',
        module: 'moduleName',
        version: 1.0
    },
}
class Logger {
    private logger
    private metaInfo
    constructor(serviceName,moduleName) {

        const transport = new winston.transports.Console({
            format: formatter,
        });
        this.metaInfo =  {
            serviceContext: {
                service: serviceName,
                version: 1.0
            },
            labels: {
                service: serviceName,
                module: moduleName,
                version: 1.0
            },
        }
        this.logger = winston.createLogger({
            level:  'debug' ,
            levels: customLevels.levels,
            transports: [ transport ],
            defaultMeta:this.metaInfo
        });

        winston.addColors(customLevels.colors);
    }

    trace(msg: any, meta?: any) {
        this.logger.log('trace', msg, meta);
    }

    debug(msg: any, meta?: any) {
        this.logger.debug(msg, meta);
    }

    info(msg: any, meta?: any) {
        this.logger.info(msg, meta);
    }

    warn(msg: any, meta?: any) {
        this.logger.warn(msg, meta);
    }

    error(msg: any, meta?: any) {
        this.logger.error(msg, meta);
    }

    fatal(msg: any, meta?: any) {
        this.logger.log('fatal', msg, meta);
    }
}

export {Logger}

