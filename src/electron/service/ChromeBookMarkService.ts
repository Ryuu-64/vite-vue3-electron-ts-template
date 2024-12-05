import cheerio from "cheerio";
import {Node} from "../models/chrome/bookmark/Node";
import {Queue} from "../utils/collections/Queue";
import {service as categoryService} from "./CategoryService";
import {getFileContent} from "./FileService";
import {Category} from "../../models/Category";

class ChromeBookMarkService {
    async loadChromeBookmark(): Promise<boolean> {
        const html: string | null = await getFileContent();
        if (html === null) {
            return false;
        }

        const $ = cheerio.load(html);
        const rootNode = getRootNode($('body'));
        const rootCategory = buildCategoryTree(rootNode);
        if (rootCategory === null) {
            return false;
        }

        await this.createCategories(rootCategory);
        return true;

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

        function buildCategoryTree(rootNode: Node): Category | null {
            if (rootNode.text === undefined) {
                return null;
            }

            const rootCategory: Category = {};
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

                    const childCategory: Category = {};
                    childCategory.name = childNode.text;
                    if (category.children === undefined) {
                        category.children = [];
                    }
                    category.children.push(childCategory);
                    queue.enqueue({node: childNode, category: childCategory});
                }
            }

            return rootCategory;
        }
    };

    async findCategoryTree(): Promise<Category[]> {
        return categoryService.findCategoryTree();
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

            if (category.id === undefined) {
                const categoryData: Category = await categoryService.create(category.name);
                category.id = categoryData.id;
            }

            if (category.children === undefined) {
                continue;
            }

            for (let child of category.children) {
                if (child.name === undefined) {
                    continue;
                }
                const categoryData: Category = await categoryService.create(child.name, category.id);
                child.id = categoryData.id;

                queue.enqueue(child);
            }
        }
    }
}

export const service = new ChromeBookMarkService();
