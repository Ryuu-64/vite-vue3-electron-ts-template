import {dialog, ipcMain} from "electron";

export const setupFileService = () => {
    async function handleFileOpen() {
        const {canceled, filePaths} = await dialog.showOpenDialog({title: "Open File"});
        if (!canceled) {
            return filePaths[0];
        }
    }

    ipcMain.handle('dialog:openFile', handleFileOpen);
};
