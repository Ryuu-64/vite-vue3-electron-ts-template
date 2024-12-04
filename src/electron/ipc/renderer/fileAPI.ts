import {ipcRenderer} from "electron";
import {ImportChromeBookmark} from "../../../API/types";

export const importChromeBookmark: ImportChromeBookmark = (...args) => ipcRenderer.invoke('importChromeBookmark', ...args);
