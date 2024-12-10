import {Category} from "../models/Category";
import {Bookmark} from "../models/Bookmark";
import {Tag} from "@prisma/client";

export type ImportChromeBookmark = () => Promise<boolean>;

export type FindAllCategories = () => Promise<Category[]>;
export type FindAllCategoriesWithParent = () => Promise<Category[]>;
export type FindCategoryTree = () => Promise<Category[]>;

export type CreateBookmark = (
    id: string, url: string, name: string, description: string,
    createdAt: Date, updatedAt: Date, categoryId: string, tags: Tag[]
) => Promise<Bookmark>;
export type FindBookmark = (id: string) => Promise<Bookmark | null>;
export type FindAllBookmarks = () => Promise<Bookmark[]>;
