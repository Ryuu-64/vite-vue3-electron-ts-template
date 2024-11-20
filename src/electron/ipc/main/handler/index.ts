import {registerBookmarkService} from "./bookmark";
import {registerWinston} from "./winston";
import {registerChromeBookmarkImporter} from "./chromeBookmark";

export function registerAllIPCMainHandlers() {
    registerBookmarkService();
    registerChromeBookmarkImporter();
    registerWinston();
}
