export class Category {
    id?: string;
    name?: string;
    parentId?: string;
    parent?: Category;
    children?: Category[];
}
