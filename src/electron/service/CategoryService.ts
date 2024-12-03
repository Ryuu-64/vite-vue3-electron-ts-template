import {Prisma, CategoryClosure} from "@prisma/client";
import TransactionClient = Prisma.TransactionClient;
import {Category} from "../../models/Category";
import {prisma} from "../component/Prisma";
import {service as closureService} from "../service/CategoryClosureService";
import {logger} from "../component/Logger";

class CategoryService {
    // 构建树状结构
    async findCategoryTree(): Promise<Category[]> {
        const categories: Category[] | null = await this.findAll();
        const closures: CategoryClosure[] = await closureService.findAll();
        const categoryMap = new Map<string, Category>();

        // 初始化映射，并为每个节点添加 children 数组
        categories.forEach(category => {
            category.children = [];
            if (category.id != null) {
                categoryMap.set(category.id, category);
            } else {
                logger.warn("category id not found");
            }
        });

        // 构建树：遍历闭包数据，找到父子关系
        closures.forEach(relation => {
            if (relation.depth === 1) { // 只处理直接父子关系
                const parent: Category | undefined = categoryMap.get(relation.ancestorId);
                const child: Category | undefined = categoryMap.get(relation.descendantId);
                if (parent && child && parent !== child) { // 避免自引用
                    parent.children!.push(child);
                }
            }
        });

        // 筛选根节点（没有父节点）
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

    async create(name: string, parentId?: string): Promise<Category> {
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

    async findOne(id: string): Promise<Category | null> {
        return prisma.category.findUnique({
            where: {id},
        });
    }

    async findAll(): Promise<Category[]> {
        return prisma.category.findMany();
    }
}

export const service = new CategoryService();
