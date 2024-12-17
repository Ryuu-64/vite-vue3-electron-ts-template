import {Prisma} from "@prisma/client";
import TransactionClient = Prisma.TransactionClient;
import {Category} from "../../models/Category";
import {prisma} from "../component/Prisma";
import {service as closureService} from "../service/CategoryClosureService";
import {CategoryClosure} from "../../models/CategoryClosure";
import {LoggerFactory} from "../factory/LoggerFactory";
import winston from "winston";

class CategoryService {
    private logger: winston.Logger = LoggerFactory.getLoggerByConstructor(CategoryService);

    async findCategoryTree(): Promise<Category[]> {
        const categories: Category[] | null = await this.findAll();
        const closures: CategoryClosure[] = await closureService.findAll();
        const categoryMap = new Map<string, Category>();

        categories.forEach(category => {
            category.children = [];
            if (category.id != null) {
                categoryMap.set(category.id, category);
            } else {
                this.logger.warn("category id not found");
            }
        });

        closures.forEach(relation => {
            if (relation.depth === 1) {
                const parent: Category | undefined = categoryMap.get(relation.ancestorId);
                const child: Category | undefined = categoryMap.get(relation.descendantId);
                if (parent && child && parent !== child) {
                    parent.children!.push(child);
                }
            }
        });

        return categories.filter(
            category => {
                return !closures.some(
                    relation => relation.descendantId === category.id &&
                        relation.depth === 1 &&
                        relation.ancestorId !== category.id
                );
            }
        );
    }

    create(name: string, parentId?: string): Promise<Category> {
        return prisma.$transaction(
            async (prisma: Prisma.TransactionClient) => {
                const category: Category = await insertCategoryNode(prisma, name);
                if (category.id == null) {
                    throw new Error("Category id not found");
                }

                await closureService.insertSelfClosureRelation(prisma, category.id);

                if (parentId !== undefined) {
                    await closureService.insertParentClosureRelations(prisma, category.id, parentId);
                }

                return category;
            }
        );

        async function insertCategoryNode(prisma: TransactionClient, name: string): Promise<Category> {
            return prisma.category.create({
                data: {name}
            });
        }
    }

    findUnique(id: string): Promise<Category | null> {
        return prisma.category.findUnique({
            where: {id},
        });
    }

    findAll(): Promise<Category[]> {
        return prisma.category.findMany();
    }

    delete(id: string): Promise<Category> {
        return prisma.$transaction(
            async (prisma: Prisma.TransactionClient) => {
                const closurePromise = closureService.deleteManyByCategoryId(prisma, id);

                const deleteCategoryPromise = prisma.category.delete({
                    where: {id: id},
                });

                const [closureResult, categoryResult] = await Promise.all([closurePromise, deleteCategoryPromise]);
                if (closureResult.count === 0) {
                    this.logger.warn(`Delete failed. category id=${id}.`);
                }

                return categoryResult;
            }
        );
    }

    async findAllWithParent(): Promise<Category[]> {
        const categoriesPromise: Promise<Category[]> = prisma.category.findMany();
        const closuresPromise: Promise<CategoryClosure[]> = closureService.findAllParent();

        const [categories, closures] = await Promise.all([categoriesPromise, closuresPromise])

        const idCategoryMap: Map<string, Category> = new Map();
        categories.forEach(category => {
            if (category.id === undefined) {
                this.logger.warn("category id not found");
                return;
            }

            idCategoryMap.set(category.id, category);
        });

        closures.forEach(closure => {
            const category = idCategoryMap.get(closure.descendantId);
            if (category === undefined) {
                return;
            }

            category.parent = idCategoryMap.get(closure.ancestorId);
        });

        return categories;
    }
}

export const service = new CategoryService();
