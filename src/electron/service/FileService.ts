import {dialog} from "electron";
import fs from "node:fs";

export const getFileContent = async (): Promise<string | null> => {
    const result = await dialog.showOpenDialog({
        title: 'select .html file',
        filters: [{name: 'HTML Files', extensions: ['html', 'htm']}],
        properties: ['openFile']
    });

    if (result.canceled) {
        console.error('operation cancelled.');
        return null;
    }

    if (result.filePaths.length === 0) {
        console.error('file not found.');
        return null;
    }

    const filePath = result.filePaths[0];
    try {
        return fs.readFileSync(filePath, 'utf-8');
    } catch (error) {
        console.error(error);
        return null;
    }
};
