import {join} from 'path';
import {
    app,
    BrowserWindow,
    ipcMain,
    dialog
} from 'electron';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

const isDev = process.env.npm_lifecycle_event === "app:dev";

async function handleFileOpen() {
    const {canceled, filePaths} = await dialog.showOpenDialog({title: "Open File"});
    if (!canceled) {
        return filePaths[0];
    }
}

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            sandbox: false,
            preload: join(__dirname, '../preload/preload.js'),
        },
    });

    // and load the index.html of the app.
    if (isDev) {
        mainWindow.loadURL('http://localhost:3000');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(join(__dirname, '../../index.html'));
    }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    ipcMain.handle('dialog:openFile', handleFileOpen);
    createWindow();
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length !== 0) {
            return;
        }

        createWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform === 'darwin') {
        return;
    }

    app.quit();
});

ipcMain.handle('createUser', async (event, name, email) => {
    try {
        return await prisma.user.create({
            data: {
                name,
                email,
            },
        });
    } catch (error) {
        console.error('Error creating user:', error);
        throw error; // 抛出错误以便渲染进程可以捕获
    }
});

ipcMain.handle('getUser', async (event, id: number) => {
    try {
        return await prisma.user.findUnique({
            where: {id},
        });
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error; // 抛出错误以便渲染进程可以捕获
    }
});
