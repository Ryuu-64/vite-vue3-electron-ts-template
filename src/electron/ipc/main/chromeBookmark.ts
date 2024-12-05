import {ipcMain} from "electron";
import {service} from "../../service/ChromeBookMarkService";
import {FindCategoryTree, ImportChromeBookmark} from "../../../types/api";
import {IpcMainInvoke} from "../../../types/ipcMainTypes";

export const registerChromeBookmarkImporter = () => {
    ipcMain.handle(
        'importChromeBookmark',
        ((_event, ...args) => service.loadChromeBookmark(...args)) as IpcMainInvoke<ImportChromeBookmark>
    );

    ipcMain.handle(
        'findCategoryTree',
        ((_event, ...args) => service.findCategoryTree(...args)) as IpcMainInvoke<FindCategoryTree>
    );
};
