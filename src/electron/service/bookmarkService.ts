import {Bookmark, PrismaClient, Tag} from "@prisma/client";

class BookmarkService {
    private readonly prisma = new PrismaClient();

    async create(
        id: string, url: string, name: string, description: string,
        createdAt: Date, updatedAt: Date, categoryId: string, tags: Tag[]
    ): Promise<Bookmark> {
        try {
            return await this.prisma.bookmark.create({
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

    async find(id: string): Promise<Bookmark | null> {
        try {
            return await this.prisma.bookmark.findUnique({
                where: {id},
            });
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<Bookmark[] | null> {
        try {
            return await this.prisma.bookmark.findMany();
        } catch (error) {
            throw error;
        }
    }
}

export const bookmarkService = new BookmarkService();
