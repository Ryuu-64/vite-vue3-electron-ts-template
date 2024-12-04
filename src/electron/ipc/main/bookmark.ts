import {ipcMain} from "electron";
import {service} from "../../service/BookmarkService";
import {CreateBookmark, FindAllBookmark, FindBookmark} from "../../../API/types";
import {IpcMainInvoke} from "./invoke";

export const registerBookmarkService = () => {
    ipcMain.handle(
        'createBookmark',
        ((_event, ...args) => service.create(...args)) as IpcMainInvoke<CreateBookmark>
    );

    ipcMain.handle(
        'findBookmark',
        ((_event, ...args) => service.findOne(...args)) as IpcMainInvoke<FindBookmark>
    );
    ipcMain.handle(
        'findAllBookmarks',
        ((_event, ...args) => service.findAll(...args)) as IpcMainInvoke<FindAllBookmark>
    );
};
