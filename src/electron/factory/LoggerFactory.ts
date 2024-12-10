import winston from "winston";

export class LoggerFactory {
    static getLogger(key: string): winston.Logger {
        const printfFormat = winston.format.printf(
            ({timestamp, level, message, stack}) => {
                return stack
                    ? `${timestamp} [${level.toUpperCase()}] <${key}>: ${message}\n${stack}`
                    : `${timestamp} [${level.toUpperCase()}] <${key}>: ${message}`;
            }
        )

        return winston.createLogger({
            level: 'debug',
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
