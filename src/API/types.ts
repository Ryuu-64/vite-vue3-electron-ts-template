import {Category} from "../models/Category";
import {Bookmark, Tag} from "@prisma/client";

export type ImportChromeBookmark = () => Promise<boolean>;
export type FindCategoryTree = () => Promise<Category[]>;

export type CreateBookmark = (
    id: string, url: string, name: string, description: string,
    createdAt: Date, updatedAt: Date, categoryId: string, tags: Tag[]
) => Promise<Bookmark>;
export type FindBookmark = (id: string) => Promise<Bookmark | null>;
export type FindAllBookmark = (id: string) => Promise<Bookmark[]>;
