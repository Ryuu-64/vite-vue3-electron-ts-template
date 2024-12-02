import {ipcRenderer} from "electron";

export async function importChromeBookmark(): Promise<boolean> {
    return await ipcRenderer.invoke('importChromeBookmark');
}
