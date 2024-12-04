import {ipcRenderer} from "electron";
import {CreateBookmark, FindAllBookmark, FindBookmark} from "../../API/types";

export function createBookmark(...args: Parameters<CreateBookmark>): ReturnType<CreateBookmark> {
    return ipcRenderer.invoke('createBookmark', ...args);
}

export function findBookmark(...args: Parameters<FindBookmark>): ReturnType<FindBookmark> {
    return ipcRenderer.invoke('findBookmark', ...args);
}

export function findAllBookmarks(...args: Parameters<FindAllBookmark>): ReturnType<FindAllBookmark> {
    return ipcRenderer.invoke('findAllBookmarks', ...args);
}
