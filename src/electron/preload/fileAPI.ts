import {ipcRenderer} from "electron";

export const importChromeBookmark =
    () => ipcRenderer.invoke('importChromeBookmark');