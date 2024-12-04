import {Bookmark, Tag} from "@prisma/client";
import {ipcMain} from "electron";
import {service} from "../../../service/BookmarkService";
import {CreateBookmark} from "../../../../API/types";

export const registerBookmarkService = () => {
    ipcMain.handle(
        'createBookmark',
        async (
            _event, ...args: Parameters<CreateBookmark>
        ) => service.create(...args)
    );

    ipcMain.handle(
        'findBookmark',
        async (_event: Electron.IpcMainInvokeEvent, id: string): Promise<Bookmark | null> => {
            return await service.findOne(id);
        }
    );
    ipcMain.handle(
        'findAllBookmarks',
        async (_event: Electron.IpcMainInvokeEvent): Promise<Bookmark[] | null> => {
            return await service.findAll();
        }
    );
}
