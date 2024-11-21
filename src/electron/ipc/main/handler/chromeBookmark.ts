import {ipcMain} from "electron";
import {loadChromeBookmark} from "../../../service/ChromeBookMarkService"
import {getFileContent} from "../../../service/FileService"

export const registerChromeBookmarkImporter = () => {
    ipcMain.handle(
        'importChromeBookmark',
        async (): Promise<void> => {
            const fileContent: string | null = await getFileContent();
            if (fileContent === null) {
                return;
            }

            loadChromeBookmark(fileContent);
        }
    );
}
