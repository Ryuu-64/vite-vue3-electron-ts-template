import {ipcMain} from "electron";
import {service} from "../../../service/ChromeBookMarkService";
import {Category} from "../../../../models/Category";

export const registerChromeBookmarkImporter = () => {
    ipcMain.handle(
        'importChromeBookmark',
        async (): Promise<boolean> => {
            return await service.loadChromeBookmark();
        }
    );

    ipcMain.handle(
        'findCategoryTree',
         (): Promise<Category[]> => service.findCategoryTree()
    );
};
