import {ipcRenderer} from "electron";
import {CreateBookmark, FindAllBookmark, FindBookmark} from "../../../API/types";

export const createBookmark: CreateBookmark = (...args) => ipcRenderer.invoke('createBookmark', ...args);
export const findBookmark: FindBookmark = (...args) => ipcRenderer.invoke('findBookmark', ...args);
export const findAllBookmarks: FindAllBookmark = (...args) => ipcRenderer.invoke('findAllBookmarks', ...args);
