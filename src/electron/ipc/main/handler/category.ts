import {ipcMain} from "electron";
import {service} from "../../../service/CategoryService";
import {Category} from "../../../../models/Category";

export const registerCategoryService = () => {
    ipcMain.handle(
        "findAllCategories",
        async (_event: Electron.IpcMainInvokeEvent,): Promise<Category[]> => {
            return service.findAll();
        }
    );
};
