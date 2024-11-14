// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import {contextBridge} from 'electron';
import * as logAPI from './logAPI';
import * as bookmarkAPI from './bookmarkAPI';
import * as fileAPI from './fileAPI';

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
    logAPI: logAPI,
    bookmarkAPI: bookmarkAPI,
    fileAPI: fileAPI
});
