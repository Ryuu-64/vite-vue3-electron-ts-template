import {ipcRenderer} from "electron";
import {Category} from "@prisma/client";

export const findAllCategories =
    async (): Promise<Category[] | null> => ipcRenderer.invoke("findAllCategories");