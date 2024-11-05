import {ipcMain} from "electron";
import {PrismaClient, Bookmark} from "@prisma/client";

const prisma = new PrismaClient();

export const setupBookmarkService = () => {
    ipcMain.handle(
        'createBookmark',
        async (
            event,
            id, url, name, description, createdAt, updatedAt, categoryId, tags
        ) => {
            try {
                return await prisma.bookmark.create({
                    data: {
                        id,
                        url,
                        name,
                        description,
                        createdAt,
                        updatedAt,
                        categoryId,
                        tags,
                    }
                });
            } catch (error) {
                console.error('Error creating bookmark:', error);
                throw error;
            }
        }
    );

    ipcMain.handle(
        'findBookmark',
        async (
            event, id: number
        ) => {
            try {
                return await prisma.bookmark.findUnique({
                    where: {id},
                });
            } catch (error) {
                console.error('Error fetching bookmark:', error);
                throw error;
            }
        }
    );

    ipcMain.handle(
        'findAllBookmarks',
        async (event): Promise<Bookmark[]> => {
            try {
                return await prisma.bookmark.findMany();
            } catch (error) {
                console.error('Error fetching bookmark:', error);
                throw error;
            }
        }
    );
};
