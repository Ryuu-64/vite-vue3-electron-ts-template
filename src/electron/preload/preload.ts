// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import {contextBridge, ipcRenderer} from 'electron';
import {Bookmark, Tag} from "@prisma/client";

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector: any, text: any) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency]);
    }
});

contextBridge.exposeInMainWorld('electronAPI', {
    openHtmlFile: () => ipcRenderer.invoke('openHtmlFile'),
    createBookmark:
        (
            id: string, url: string, name: string, description: string,
            createdAt: Date, updatedAt: Date, categoryId: number, tags: Tag[]
        ) =>
            ipcRenderer.invoke(
                'createBookmark',
                id, url, name, description, createdAt, updatedAt, categoryId, tags
            ),
    findBookmark: (id: string): Promise<Bookmark> => ipcRenderer.invoke('findBookmark', id),
    findAllBookmarks: (): Promise<Bookmark> => ipcRenderer.invoke('findAllBookmarks')
});
