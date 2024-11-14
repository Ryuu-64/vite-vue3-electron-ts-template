import {ipcRenderer} from "electron";
import {Bookmark, Tag} from "@prisma/client";

export const createBookmark =
    (
        id: string, url: string, name: string, description: string,
        createdAt: Date, updatedAt: Date, categoryId: number, tags: Tag[]
    ) => ipcRenderer.invoke(
        'createBookmark',
        id, url, name, description, createdAt, updatedAt, categoryId, tags
    );
export const findBookmark =
    (id: string): Promise<Bookmark> => ipcRenderer.invoke('findBookmark', id);
export const findAllBookmarks =
    (): Promise<Bookmark> => ipcRenderer.invoke('findAllBookmarks');
