import cheerio from "cheerio";
import {Node} from "../models/chrome/bookmark/Node";
import {Queue} from "../utils/collections/Queue";
import {Category} from "../models/chrome/bookmark/Category";
import {Category as CategoryData} from "@prisma/client";
import {service as categoryService} from "./CategoryService";

class ChromeBookMarkService {
    loadChromeBookmark(html: string) {
        const $ = cheerio.load(html);
        const rootNode = getRootNode($('body'));
        console.log(JSON.stringify(rootNode, null, 2));
        const rootCategory = this.buildCategoryTree(rootNode);
        console.log(JSON.stringify(rootCategory, null, 2));
        if (rootCategory === null) {
            return;
        }
        this.createCategories(rootCategory);

        function getRootNode($body: cheerio.Cheerio): Node {
            const node: Node = parse($body);
            initializeBody(node, $body);
            return node;
        }

        function parse($dt: cheerio.Cheerio): Node {
            const node: Node = new Node();
            $dt.children()
                .each(
                    (_, child) => {
                        const $child = $(child);
                        if ($child.is('a')) {
                            initializeDt(node, $child);
                            return;
                        }

                        if ($child.is('dl')) {
                            initializeDl(node, $dt, $child);
                            return;
                        }
                    }
                );

            return node;
        }

        function initializeBody(node: Node, $body: cheerio.Cheerio) {
            node.text = $body.children('h1').text().trim();
        }

        function initializeDt(node: Node, $a: cheerio.Cheerio) {
            node.text = $a.text();
            node.href = $a.attr('href');
            node.createAt = $a.attr('add_date');
            node.icon = $a.attr('icon');
        }

        function initializeDl(node: Node, $dt: cheerio.Cheerio, $dl: cheerio.Cheerio) {
            const heading = $dt.children('h3');
            node.text = heading.text().trim();
            node.createAt = heading.attr('add_date');
            node.updateAt = heading.attr('last_modified');
            node.children = $dl
                .children('dt')
                .toArray()
                .map(dt => $(dt))
                .map($dt => parse($dt));
        }
    };

    private buildCategoryTree(rootNode: Node): Category | null {
        if (rootNode.text === undefined) {
            return null;
        }

        const rootCategory = new Category();
        rootCategory.name = rootNode.text;
        const queue = new Queue<{ node: Node; category: Category }>();
        queue.enqueue({node: rootNode, category: rootCategory});
        while (!queue.isEmpty()) {
            const {node, category} = queue.dequeue()!;

            if (node?.children === undefined) {
                continue;
            }

            for (let childNode of node.children) {
                if (childNode?.text === undefined) {
                    continue;
                }

                if (childNode?.children === undefined) {
                    continue;
                }

                const childCategory = new Category();
                childCategory.name = childNode.text;
                childCategory.parent = category;
                if (category.children === undefined) {
                    category.children = [];
                }
                category.children.push(childCategory);
                queue.enqueue({node: childNode, category: childCategory});
            }
        }

        return rootCategory;
    }

    private async createCategories(rootCategory: Category) {
        const queue = new Queue<Category>();
        queue.enqueue(rootCategory);
        while (!queue.isEmpty()) {
            const category: Category | undefined = queue.dequeue();
            if (category === undefined) {
                continue;
            }

            if (category.name === undefined) {
                continue;
            }

            const categoryData: CategoryData = await categoryService.create(category?.name, undefined);
            category.id = categoryData.id;

            if (category.children === undefined) {
                continue;
            }

            for (let child of category.children) {
                if (child.name === undefined) {
                    continue;
                }

                const categoryData: CategoryData = await categoryService.create(child?.name, category.id);
                child.id = categoryData.id;

                queue.enqueue(child);
            }
        }
    }
}

export const service = new ChromeBookMarkService();
