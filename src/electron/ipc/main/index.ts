import {registerBookmarkService} from "./bookmark";
import {registerChromeBookmarkImporter} from "./chromeBookmark";
import {registerCategoryService} from "./category";

export const registerAllIPCMainHandlers = () => {
    registerBookmarkService();
    registerChromeBookmarkImporter();
    registerCategoryService();
};
