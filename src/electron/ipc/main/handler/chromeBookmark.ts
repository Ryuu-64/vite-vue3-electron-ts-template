import {ipcMain} from "electron";
import {getFileContent} from "../../../service/FileService"
import {loadChromeBookmark} from "../../../service/chromeBookMarkService";

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
