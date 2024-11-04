"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
var electron_1 = require("electron");
window.addEventListener('DOMContentLoaded', function () {
    var replaceText = function (selector, text) {
        var element = document.getElementById(selector);
        if (element)
            element.innerText = text;
    };
    for (var _i = 0, _a = ['chrome', 'node', 'electron']; _i < _a.length; _i++) {
        var dependency = _a[_i];
        replaceText("".concat(dependency, "-version"), process.versions[dependency]);
    }
});
electron_1.contextBridge.exposeInMainWorld('electronAPI', {
    openFile: function () { return electron_1.ipcRenderer.invoke('dialog:openFile'); },
    createBookmark: function (id, url, name, description, createdAt, updatedAt, categoryId, tags) {
        return electron_1.ipcRenderer.invoke('createBookmark', id, url, name, description, createdAt, updatedAt, categoryId, tags);
    },
    findBookmark: function (id) { return electron_1.ipcRenderer.invoke('findBookmark', id); },
    findAllBookmarks: function () { return electron_1.ipcRenderer.invoke('findAllBookmarks'); }
});
