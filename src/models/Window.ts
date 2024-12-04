import {FindCategoryTree, ImportChromeBookmark} from "../API/types";

declare global {
    interface Window {
        electronAPI: {
            categoryAPI: {
                findCategoryTree: FindCategoryTree
            };
            fileAPI: {
                importChromeBookmark: ImportChromeBookmark
            };
        };
    }
}
