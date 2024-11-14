import {ipcRenderer} from "electron";

export const openChromeBookmark =
    () => ipcRenderer.invoke('openChromeBookmark');