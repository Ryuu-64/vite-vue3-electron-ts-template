// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import {contextBridge, ipcRenderer} from 'electron';
import {Bookmark, Tag} from "@prisma/client";
import {Logger} from "vite";

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector: any, text: any) => {
        const element = document.getElementById(selector);
        if (!element) {
            return;
        }

        element.innerText = text;
    };

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});

contextBridge.exposeInMainWorld('electronAPI', {
    logDebug: (message: any): Promise<Logger> => ipcRenderer.invoke('logDebug', message),
    logInfo: (message: any): Promise<Logger> => ipcRenderer.invoke('logInfo', message),
    logWarn: (message: any): Promise<Logger> => ipcRenderer.invoke('logWarn', message),
    logError: (message: any, error: Error): Promise<Logger> => ipcRenderer.invoke('logError', message, error),
});

contextBridge.exposeInMainWorld('electronAPI', {
    openChromeBookmark: () => ipcRenderer.invoke('openChromeBookmark'),
});

contextBridge.exposeInMainWorld('electronAPI', {
    createBookmark: (
        id: string, url: string, name: string, description: string,
        createdAt: Date, updatedAt: Date, categoryId: number, tags: Tag[]
    ) => ipcRenderer.invoke(
        'createBookmark',
        id, url, name, description, createdAt, updatedAt, categoryId, tags
    ),
    findBookmark: (id: string): Promise<Bookmark> => ipcRenderer.invoke('findBookmark', id),
    findAllBookmarks: (): Promise<Bookmark> => ipcRenderer.invoke('findAllBookmarks')
});
