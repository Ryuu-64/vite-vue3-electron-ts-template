import * as fs from "node:fs";
import {dialog, ipcMain} from "electron";

export const setupCheerioService = () => {
    ipcMain.handle('openChromeBookmark', async () => {
        const result = await dialog.showOpenDialog({
            title: '选择 HTML 文件',
            filters: [{name: 'HTML Files', extensions: ['html', 'htm']}],
            properties: ['openFile']
        });

        if (result.canceled || result.filePaths.length === 0) {
            return {error: '未选择文件'};
        }

        const filePath = result.filePaths[0];

        let fileContent;
        try {
            fileContent = fs.readFileSync(filePath, 'utf-8');
        } catch (error) {
            // @ts-ignore
            return {error: error.message};
        }
        return {filePath, fileContent};
    });
}
