import {Category} from "@prisma/client";
import {ipcMain} from "electron";
import {service} from "../../../service/CategoryService";

export const registerCategoryService = () => {
    ipcMain.handle(
        "findAllCategories",
        async (_event: Electron.IpcMainInvokeEvent,): Promise<Category[] | null> => {
            return await service.findAll();
        }
    );
};
