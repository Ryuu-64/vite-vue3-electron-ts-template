import {ipcRenderer} from "electron";
import {FindAllCategories, FindAllCategoriesWithParent, FindCategoryTree} from "../../../types/api";

export const findAllCategoriesWithParent: FindAllCategoriesWithParent = (...args) => ipcRenderer.invoke('findAllCategoriesWithParent', ...args);
export const findAllCategories: FindAllCategories = (...args) => ipcRenderer.invoke('findAllCategories', ...args);
export const findCategoryTree: FindCategoryTree = (...args) => ipcRenderer.invoke('findCategoryTree', ...args);
