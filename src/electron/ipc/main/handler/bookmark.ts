import {Bookmark, Tag} from "@prisma/client";
import {create, find, findAll} from "../../../service/BookmarkService";
import {registerIpcMainHandlers} from "../../../utils/ipc/ipcUtils";

export function registerBookmarkService() {
    registerIpcMainHandlers({
        createBookmark: async (
            _event: Electron.IpcMainInvokeEvent,
            id: string, url: string, name: string, description: string,
            createdAt: Date, updatedAt: Date,
            categoryId: string, tags: Tag[]
        ): Promise<Bookmark> => {
            return await create(id, url, name, description, createdAt, updatedAt, categoryId, tags);
        },
        findBookmark: async (_event: Electron.IpcMainInvokeEvent, id: string): Promise<Bookmark | null> => {
            return await find(id);
        },
        findAllBookmarks: async (_event: Electron.IpcMainInvokeEvent): Promise<Bookmark[] | null> => {
            return await findAll();
        },
    });
}
