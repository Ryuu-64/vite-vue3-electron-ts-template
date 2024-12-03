import {Category} from "./Category";

declare global {
    interface Window {
        electronAPI: {
            categoryAPI: {
                findCategoryTree: () => Promise<Category[]>;
            };
        };
    }
}
