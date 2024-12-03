import {ipcRenderer} from "electron";
import {Category} from "@prisma/client";

export const findAllCategories =
    async (): Promise<Category[] | null> => ipcRenderer.invoke("findAllCategories");

export async function findCategoryTree(): Promise<Category[]> {
    return await ipcRenderer.invoke('findCategoryTree');
}
