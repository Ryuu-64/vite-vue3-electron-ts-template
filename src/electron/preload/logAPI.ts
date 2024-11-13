import {Logger} from "winston";
import {ipcRenderer} from "electron";

export const logDebug =
    (message: any): Promise<Logger> => ipcRenderer.invoke('logDebug', message);
export const logInfo =
    (message: any): Promise<Logger> => ipcRenderer.invoke('logInfo', message);
export const logWarn =
    (message: any): Promise<Logger> => ipcRenderer.invoke('logWarn', message);
export const logError =
    (message: any, error: Error): Promise<Logger> => ipcRenderer.invoke('logError', message, error);
