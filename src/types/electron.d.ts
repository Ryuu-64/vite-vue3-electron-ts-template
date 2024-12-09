import {
    CreateBookmark, FindAllBookmarks, FindAllCategories, FindAllCategoriesWithParent,
    FindBookmark,
    FindCategoryTree,
    ImportChromeBookmark,
    LogDebug,
    LogError,
    LogInfo,
    LogWarn
} from "./api";

declare global {
    // noinspection JSUnusedGlobalSymbols
    interface Window {
        electronAPI: {
            categoryAPI: {
                findCategoryTree: FindCategoryTree
                findAllCategories: FindAllCategories
                findAllCategoriesWithParent: FindAllCategoriesWithParent
            };
            fileAPI: {
                importChromeBookmark: ImportChromeBookmark
            };
            logAPI: {
                logDebug: LogDebug
                logInfo: LogInfo
                logWarn: LogWarn
                logError: LogError
            }
            bookmarkAPI: {
                createBookmark: CreateBookmark
                findBookmark: FindBookmark
                findAllBookmarks: FindAllBookmarks
            }
        };
    }
}
