import {Prisma} from "@prisma/client";
import TransactionClient = Prisma.TransactionClient;
import {Category} from "../../models/Category";
import {prisma} from "../component/Prisma";
import {service as closureService} from "../service/CategoryClosureService";
import {CategoryClosure} from "../../models/CategoryClosure";
import {LoggerFactory} from "../factory/LoggerFactory";
import winston from "winston";

class CategoryService {
    private logger: winston.Logger = LoggerFactory.getLoggerByClass(CategoryService);

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
                this.logger.warn("category id not found");
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

    findOne(id: string): Promise<Category | null> {
        return prisma.category.findUnique({
            where: {id},
        });
    }

    findAll(): Promise<Category[]> {
        return prisma.category.findMany();
    }

    async findAllWithParent(): Promise<Category[]> {
        const categories: Category[] = await prisma.category.findMany();
        const idCategoryMap = new Map<string, Category>();
        categories.forEach(category => {
            if (category.id === undefined) {
                this.logger.warn("category id not found");
                return;
            }

            idCategoryMap.set(category.id, category);
        });
        const closures: CategoryClosure[] = await closureService.findAllParent();
        closures.forEach(closure => {
            const category = idCategoryMap.get(closure.descendantId);
            if (category === undefined) {
                return;
            }

            category.parentName = idCategoryMap.get(closure.ancestorId)?.name;
        });
        return categories;
    }
}

export const service = new CategoryService();
