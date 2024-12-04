import {ipcRenderer} from "electron";
import {LogDebug, LogError, LogInfo, LogWarn} from "../../API/types";

export const logDebug: LogDebug = (...args) => ipcRenderer.invoke('logDebug', ...args);
export const logInfo: LogInfo = (...args) => ipcRenderer.invoke('logInfo', ...args);
export const logWarn: LogWarn = (...args) => ipcRenderer.invoke('logWarn', ...args);
export const logError: LogError = (...args) => ipcRenderer.invoke('logError', ...args);
