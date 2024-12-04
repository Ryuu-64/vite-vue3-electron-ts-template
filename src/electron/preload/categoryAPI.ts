import {ipcRenderer} from "electron";
import {Category} from "@prisma/client";
import {FindCategoryTree} from "../../API/types";

export const findAllCategories =
    async (): Promise<Category[] | null> => ipcRenderer.invoke("findAllCategories");

export async function findCategoryTree(...args: Parameters<FindCategoryTree>): ReturnType<FindCategoryTree> {
    return await ipcRenderer.invoke('findCategoryTree', ...args);
}
