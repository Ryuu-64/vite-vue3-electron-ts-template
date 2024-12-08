import {Tag} from "@prisma/client";
import {prisma} from "../component/Prisma";
import {Bookmark} from "../../models/Bookmark";

class BookmarkService {
    async create(
        id: string, url: string, name: string, description: string,
        createdAt: Date, updatedAt: Date, categoryId: string, tags: Tag[]
    ): Promise<Bookmark> {
        return prisma.bookmark.create({
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
    }

    findOne(id: string): Promise<Bookmark | null> {
        return prisma.bookmark.findUnique({
            where: {id},
        });
    }

    findAll(): Promise<Bookmark[]> {
        return prisma.bookmark.findMany();
    }
}

export const service = new BookmarkService();
