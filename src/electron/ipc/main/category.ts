import {ipcMain} from "electron";
import {service} from "../../service/CategoryService";
import {IpcMainInvoke} from "../../../types/ipcMainTypes";
import {FindAllCategories} from "../../../types/api";

export const registerCategoryService = () => {
    ipcMain.handle(
        "findAllCategories",
        ((_event, ...args) => service.findAll(...args)) as IpcMainInvoke<FindAllCategories>
    );
};
