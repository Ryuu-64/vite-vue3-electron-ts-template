"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var electron_1 = require("electron");
var bookmarkService_1 = require("../service/bookmarkService");
var fileService_1 = require("../service/fileService");
var isDev = process.env.npm_lifecycle_event === "app:dev";
function createWindow() {
    // Create the browser window.
    var mainWindow = new electron_1.BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            sandbox: false,
            preload: (0, path_1.join)(__dirname, '../preload/preload.js'),
        },
    });
    // and load the index.html of the app.
    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    }
    else {
        mainWindow.loadFile((0, path_1.join)(__dirname, '../../index.html'));
    }
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.whenReady().then(function () {
    (0, bookmarkService_1.setupBookmarkService)();
    (0, fileService_1.setupFileService)();
    createWindow();
    electron_1.app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (electron_1.BrowserWindow.getAllWindows().length !== 0) {
            return;
        }
        createWindow();
    });
});
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', function () {
    if (process.platform === 'darwin') {
        return;
    }
    electron_1.app.quit();
});
