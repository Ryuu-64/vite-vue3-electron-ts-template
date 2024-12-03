import {CategoryClosure} from "@prisma/client";
import {prisma} from "../component/Prisma";
import {Prisma} from "@prisma/client/extension";
import TransactionClient = Prisma.TransactionClient;

class CategoryClosureService {
    async insertSelfClosureRelation(prisma: TransactionClient, categoryId: string) {
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

    async findAll(): Promise<CategoryClosure[]> {
        return prisma.categoryClosure.findMany();
    }
}

export const service = new CategoryClosureService();
