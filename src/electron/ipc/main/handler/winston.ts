import {ipcMain} from "electron";
import winston from "winston";

export const registerWinston = () => {
    ipcMain.handle(
        'logDebug',
        async (_event, message: any): Promise<void> => {
            logger.debug(message.toString())
        }
    );
    ipcMain.handle(
        'logInfo',
        async (_event, message: any): Promise<void> => {
            logger.info(message.toString())
        }
    );
    ipcMain.handle(
        'logWarn',
        async (_event, message: any): Promise<void> => {
            logger.warn(message.toString())
        }
    );
    ipcMain.handle(
        'logError',
        async (_event, message: string, error: Error): Promise<void> => {
            logger.error(message, error)
        }
    );

    const printfFormat = winston.format.printf(({timestamp, level, message, stack}) => {
        return stack
            ? `${timestamp} [${level.toUpperCase()}]: ${message}\n${stack}`
            : `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })

    const logger = winston.createLogger({
        level: 'info',
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
