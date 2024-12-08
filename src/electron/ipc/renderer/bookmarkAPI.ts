import {ipcRenderer} from "electron";
import {CreateBookmark, FindAllBookmarks, FindBookmark} from "../../../types/api";

export const createBookmark: CreateBookmark = (...args) => ipcRenderer.invoke('createBookmark', ...args);
export const findBookmark: FindBookmark = (...args) => ipcRenderer.invoke('findBookmark', ...args);
export const findAllBookmarks: FindAllBookmarks = (...args) => ipcRenderer.invoke('findAllBookmarks', ...args);
