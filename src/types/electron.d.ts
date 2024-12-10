import {
    CreateBookmark, FindAllBookmarks, FindAllCategories, FindAllCategoriesWithParent,
    FindBookmark,
    FindCategoryTree,
    ImportChromeBookmark,
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
            bookmarkAPI: {
                createBookmark: CreateBookmark
                findBookmark: FindBookmark
                findAllBookmarks: FindAllBookmarks
            };
        };
    }
}
