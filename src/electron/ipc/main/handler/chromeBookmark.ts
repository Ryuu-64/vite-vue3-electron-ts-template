import {ipcMain} from "electron";
import {service} from "../../../service/ChromeBookMarkService";
import {FindCategoryTree, ImportChromeBookmark} from "../../../../API/types";

export const registerChromeBookmarkImporter = () => {
    ipcMain.handle(
        'importChromeBookmark',
        (_, ...args: Parameters<ImportChromeBookmark>): ReturnType<ImportChromeBookmark> =>
            service.loadChromeBookmark(...args)
    );

    ipcMain.handle(
        'findCategoryTree',
        (_, ...args: Parameters<FindCategoryTree>): ReturnType<FindCategoryTree> =>
            service.findCategoryTree(...args)
    );
};
