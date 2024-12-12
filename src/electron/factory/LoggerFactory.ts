import winston from "winston";
import {TransformableInfo} from "logform";
import config from "../../assets/configs/winston.json";

export class LoggerFactory {
    // noinspection JSUnusedLocalSymbols
    private constructor() {
    }

    static getLoggerByClass<T extends { new(...args: any[]): {} }>(cls: T): winston.Logger {
        return this.getLoggerByKey(cls.name);
    }

    private static getLoggerByKey(key: string): winston.Logger {
        const templateFunction: (info: TransformableInfo) => string =
            ({timestamp, level, message, stack}) => {
                return stack
                    ? `${timestamp} [${level.toUpperCase()}] <${key}>: ${message}\n${stack}`
                    : `${timestamp} [${level.toUpperCase()}] <${key}>: ${message}`;
            };

        return winston.createLogger({
            level: config.level,
            format: winston.format.combine(
                winston.format.timestamp(config.format.timestamp.options),
                winston.format.errors(config.format.errors.options),
                winston.format.printf(templateFunction)
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File(config.transports.file.options),
            ],
        });
    }
}
