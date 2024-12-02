import {registerBookmarkService} from "./bookmark";
import {registerWinston} from "./winston";
import {registerChromeBookmarkImporter} from "./chromeBookmark";
import {registerCategoryService} from "./category";

export const registerAllIPCMainHandlers = () => {
    registerBookmarkService();
    registerChromeBookmarkImporter();
    registerWinston();
    registerCategoryService();
};
