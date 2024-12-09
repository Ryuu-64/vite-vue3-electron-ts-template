import {ipcMain} from "electron";
import {service} from "../../service/CategoryService";
import {IpcMainInvoke} from "../../../types/ipcMainTypes";
import {FindAllCategoriesWithParent} from "../../../types/api";

export const registerCategoryService = () => {
    ipcMain.handle(
        "findAllCategories",
        ((_event, ...args) => service.findAll(...args)) as IpcMainInvoke<FindAllCategoriesWithParent>
    );

    ipcMain.handle(
        "findAllCategoriesWithParent",
        ((_event, ...args) => service.findAllWithParent(...args)) as IpcMainInvoke<FindAllCategoriesWithParent>
    );
};
