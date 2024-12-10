import {contextBridge} from 'electron';
import * as bookmarkAPI from '../ipc/renderer/bookmarkAPI';
import * as fileAPI from '../ipc/renderer/fileAPI';
import * as categoryAPI from '../ipc/renderer/categoryAPI';

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
    bookmarkAPI: bookmarkAPI,
    categoryAPI: categoryAPI,
    fileAPI: fileAPI
});
