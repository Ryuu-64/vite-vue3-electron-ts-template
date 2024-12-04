import {ipcMain} from "electron";
import {service} from "../../../service/CategoryService";
import {IpcMainInvoke} from "../invoke";
import {FindAllCategories} from "../../../../API/types";

export const registerCategoryService = () => {
    ipcMain.handle(
        "findAllCategories",
        ((_event, ...args) => service.findAll(...args)) as IpcMainInvoke<FindAllCategories>
    );
};
