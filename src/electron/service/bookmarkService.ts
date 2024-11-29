import {Bookmark, Tag} from "@prisma/client";
import {prisma} from "../component/Prisma";

class BookmarkService {
    async create(
        id: string, url: string, name: string, description: string,
        createdAt: Date, updatedAt: Date, categoryId: string, tags: Tag[]
    ): Promise<Bookmark> {
        try {
            return await prisma.bookmark.create({
                data: {
                    id, url, name, description,
                    createdAt, updatedAt,
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
            throw error;
        }
    }

    async findOne(id: string): Promise<Bookmark | null> {
        try {
            return await prisma.bookmark.findUnique({
                where: {id},
            });
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<Bookmark[] | null> {
        try {
            return await prisma.bookmark.findMany();
        } catch (error) {
            throw error;
        }
    }
}

export const service = new BookmarkService();
