import {join} from 'path';
import {
    app,
    BrowserWindow
} from 'electron';
import {registerAllIPCMainHandlers} from '../ipc/main/handler';

app.whenReady()
    .then(() => {
        registerAllIPCMainHandlers();
        createWindow();
    });

app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
        return;
    }

    app.quit();
});

const createWindow = async () => {
    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            sandbox: false,
            preload: join(__dirname, '../preload/preload.js'),
        },
    });

    const isDev = process.env.npm_lifecycle_event === "app:dev";
    if (isDev) {
        await mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(join(__dirname, '../../index.html'));
    }
}
