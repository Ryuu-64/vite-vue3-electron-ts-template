import {ipcRenderer} from "electron";
import {Bookmark, Tag} from "@prisma/client";

export async function createBookmark
(
    id: string, url: string, name: string, description: string,
    createdAt: Date, updatedAt: Date, categoryId: number, tags: Tag[]
): Promise<Bookmark> {
    return await ipcRenderer.invoke(
        'createBookmark',
        id, url, name, description, createdAt, updatedAt, categoryId, tags
    );
}

export async function findBookmark(id: string): Promise<Bookmark | null> {
    return await ipcRenderer.invoke('findBookmark', id);
}

export async function findAllBookmarks(): Promise<Bookmark[] | null> {
    return await ipcRenderer.invoke('findAllBookmarks');
}
