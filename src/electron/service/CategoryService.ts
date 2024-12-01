import {Category} from "@prisma/client";
import {prisma} from "../component/Prisma";

class CategoryService {
    async create(name: string, parentId?: string): Promise<Category> {
        async function insertCategoryNode(name: string): Promise<Category> {
            return prisma.category.create({
                data: {name}
            });
        }

        async function insertSelfClosureRelation(categoryId: string) {
            return prisma.categoryClosure.create({
                data: {
                    ancestorId: categoryId,
                    descendantId: categoryId,
                    depth: 0
                }
            });
        }

        async function insertParentClosureRelations(newCategoryId: string, parentId: string) {
            const parentRelations =
                await prisma.categoryClosure.findMany({
                    where: {descendantId: parentId}
                });

            const closureData =
                parentRelations.map(
                    relation => ({
                        ancestorId: relation.ancestorId,
                        descendantId: newCategoryId,
                        depth: relation.depth + 1
                    })
                );

            return prisma.categoryClosure.createMany({data: closureData});
        }

        return prisma.$transaction(async () => {
            const newCategory = await insertCategoryNode(name);

            await insertSelfClosureRelation(newCategory.id);

            if (parentId) {
                await insertParentClosureRelations(newCategory.id, parentId);
            }

            return newCategory;
        });
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
