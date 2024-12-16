import {Prisma, CategoryClosure} from "@prisma/client";
import TransactionClient = Prisma.TransactionClient;
import {prisma} from "../component/Prisma";
import {BatchPayload} from "../utils/prisma/BatchPayload";

class CategoryClosureService {
    insertSelfClosureRelation(prisma: TransactionClient, categoryId: string) {
        return prisma.categoryClosure.create({
            data: {
                ancestorId: categoryId,
                descendantId: categoryId,
                depth: 0
            }
        });
    }

    async insertParentClosureRelations(prisma: TransactionClient, newCategoryId: string, parentId: string) {
        const parentRelations: CategoryClosure[] =
            await prisma.categoryClosure.findMany({
                where: {descendantId: parentId}
            });

        const closureData: CategoryClosure[] =
            parentRelations.map(
                relation => ({
                    ancestorId: relation.ancestorId,
                    descendantId: newCategoryId,
                    depth: relation.depth + 1
                })
            );

        return prisma.categoryClosure.createMany({data: closureData});
    }

    findAll(): Promise<CategoryClosure[]> {
        return prisma.categoryClosure.findMany();
    }

    findAllParent(): Promise<CategoryClosure[]> {
        return prisma.categoryClosure.findMany({
            where: {depth: 1}
        });
    }

    deleteManyByCategoryId(prisma: TransactionClient, categoryId: string): Promise<BatchPayload> {
        return prisma.categoryClosure.deleteMany({
            where: {
                OR: [
                    {ancestorId: categoryId},
                    {descendantId: categoryId},
                ]
            }
        });
    }
}

export const service = new CategoryClosureService();
