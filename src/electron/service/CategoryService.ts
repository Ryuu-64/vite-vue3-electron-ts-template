import {Category} from "@prisma/client";
import {prisma} from "../component/Prisma";

class CategoryService {
    async create(name: string, parentId?: string): Promise<Category> {
        try {
            return prisma.category.create({
                data: {
                    name,
                    parentId,
                }
            })
        } catch (error) {
            throw error;
        }
    }

    async findOne(id: string): Promise<Category | null> {
        try {
            return await prisma.category.findUnique({
                where: {id},
            });
        } catch (error) {
            throw error;
        }
    }

    async findAll(): Promise<Category[] | null> {
        try {
            return await prisma.category.findMany();
        } catch (error) {
            throw error;
        }
    }
}

export const service = new CategoryService();
