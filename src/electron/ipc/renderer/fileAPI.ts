import {ipcRenderer} from "electron";
import {ImportChromeBookmark} from "../../../types/api";

export const importChromeBookmark: ImportChromeBookmark = (...args) => ipcRenderer.invoke('importChromeBookmark', ...args);
