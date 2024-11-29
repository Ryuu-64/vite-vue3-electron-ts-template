import {ipcMain} from "electron";
import {getFileContent} from "../../../service/FileService"
import {service} from "../../../service/ChromeBookMarkService";

export const registerChromeBookmarkImporter = () => {
    ipcMain.handle(
        'importChromeBookmark',
        async (): Promise<void> => {
            const fileContent: string | null = await getFileContent();
            if (fileContent === null) {
                return;
            }

            service.loadChromeBookmark(fileContent);
        }
    );
}
