import {ipcRenderer} from "electron";
import {FindAllCategories, FindCategoryTree} from "../../../types/api";

export const findAllCategories: FindAllCategories = (...args) => ipcRenderer.invoke('findAllCategories', ...args);
export const findCategoryTree: FindCategoryTree = (...args) => ipcRenderer.invoke('findCategoryTree', ...args);
