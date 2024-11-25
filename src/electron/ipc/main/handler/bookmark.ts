import {Bookmark, Tag} from "@prisma/client";
import {ipcMain} from "electron";
import {bookmarkService as service} from "../../../service/BookmarkService";

export const registerBookmarkService = () => {
    ipcMain.handle(
        'createBookmark',
        async (
            _event: Electron.IpcMainInvokeEvent,
            id: string, url: string, name: string, description: string,
            createdAt: Date, updatedAt: Date,
            categoryId: string, tags: Tag[]
        ): Promise<Bookmark> => {
            return await service.create(id, url, name, description, createdAt, updatedAt, categoryId, tags);
        }
    );
    ipcMain.handle(
        'findBookmark',
        async (_event: Electron.IpcMainInvokeEvent, id: string): Promise<Bookmark | null> => {
            return await service.find(id);
        }
    );
    ipcMain.handle(
        'findAllBookmarks',
        async (_event: Electron.IpcMainInvokeEvent): Promise<Bookmark[] | null> => {
            return await service.findAll();
        }
    );
}
