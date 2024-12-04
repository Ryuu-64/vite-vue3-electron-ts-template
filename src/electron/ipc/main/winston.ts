import {ipcMain} from "electron";
import {logger} from "../../component/Logger";
import {LogDebug, LogError, LogInfo, LogWarn} from "../../../API/types";
import {IpcMainInvoke} from "./invoke";

export const registerWinston = () => {
    ipcMain.handle(
        'logDebug',
        (async (_event, ...args) => logger.debug(...args)) as IpcMainInvoke<LogDebug>
    );
    ipcMain.handle(
        'logInfo',
        (async (_event, ...args) => logger.info(...args)) as IpcMainInvoke<LogInfo>
    );
    ipcMain.handle(
        'logWarn',
        (async (_event, ...args) => logger.warn(...args)) as IpcMainInvoke<LogWarn>
    );
    ipcMain.handle(
        'logError',
        (async (_event, ...args) => logger.error(...args)) as IpcMainInvoke<LogError>
    );
};
