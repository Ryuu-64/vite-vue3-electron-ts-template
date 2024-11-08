import {ipcMain} from "electron";
import {PrismaClient, Tag} from "@prisma/client";

const prisma = new PrismaClient();

export const setupBookmarkService = () => {
    ipcMain.handle(
        'createBookmark',
        async (
            event,
            id: string, url: string, name: string, description: string,
            createdAt: Date, updatedAt: Date, categoryId: string, tags: Tag[]
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
                        tags: {
                            connectOrCreate: tags.map(tag => ({
                                where: {id: tag.id ?? ''},
                                create: {name: tag.name}
                            }))
                        }
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
            event, id: string
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
        async (event) => {
            try {
                return await prisma.bookmark.findMany();
            } catch (error) {
                console.error('Error fetching bookmark:', error);
                throw error;
            }
        }
    );
};
