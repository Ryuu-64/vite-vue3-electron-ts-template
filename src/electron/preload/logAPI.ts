import {Logger} from "winston";
import {ipcRenderer} from "electron";

export async function logDebug(message: any): Promise<Logger> {
    return await ipcRenderer.invoke('logDebug', message);
}

export async function logInfo(message: any): Promise<Logger> {
    return await ipcRenderer.invoke('logInfo', message);
}

export async function logWarn(message: any): Promise<Logger> {
    return await ipcRenderer.invoke('logWarn', message);
}

export async function logError(message: any, error: Error): Promise<Logger> {
    return await ipcRenderer.invoke('logError', message, error);
}
