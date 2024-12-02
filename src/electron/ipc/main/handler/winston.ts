import {ipcMain} from "electron";
import {logger} from "../../../component/Logger";

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
}
