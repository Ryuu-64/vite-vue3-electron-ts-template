import {ipcMain} from "electron";
import {service} from "../../service/CategoryService";
import {IpcMainInvoke} from "../../../types/ipcMainTypes";
import {FindAllCategories, FindAllCategoriesWithParent, DeleteCategoryById, FindCategoryTree} from "../../../types/api";

export const registerCategoryService = () => {
    ipcMain.handle(
        "findAllCategories",
        ((_event, ...args) => service.findAll(...args)) as IpcMainInvoke<FindAllCategories>
    );

    ipcMain.handle(
        "findAllCategoriesWithParent",
        ((_event, ...args) => service.findAllWithParent(...args)) as IpcMainInvoke<FindAllCategoriesWithParent>
    );

    ipcMain.handle(
        'findCategoryTree',
        ((_event, ...args) => service.findCategoryTree(...args)) as IpcMainInvoke<FindCategoryTree>
    );

    ipcMain.handle(
        "deleteCategoryById",
        ((_event, ...args) => service.delete(...args)) as IpcMainInvoke<DeleteCategoryById>
    );
};
