import {registerBookmarkService} from "./bookmark";
import {registerWinston} from "./winston";
import {registerChromeBookmarkImporter} from "./chromeBookmark";

export const registerAllIPCMainHandlers = () => {
    registerBookmarkService();
    registerChromeBookmarkImporter();
    registerWinston();
}
