import winston from "winston";
import config from "../../assets/configs/winston.json";

export class LoggerFactory {
    // noinspection JSUnusedLocalSymbols
    private constructor() {
    }

    static getLogger(key: string): winston.Logger {
        const printfFormat = winston.format.printf(
            ({timestamp, level, message, stack}) => {
                return stack
                    ? `${timestamp} [${level.toUpperCase()}] <${key}>: ${message}\n${stack}`
                    : `${timestamp} [${level.toUpperCase()}] <${key}>: ${message}`;
            }
        )

        return winston.createLogger({
            level: config.level,
            format: winston.format.combine(
                winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss.SSS'}),
                winston.format.errors({stack: true}),
                printfFormat
            ),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({filename: 'logs/app.log'})
            ],
        });
    }
}
