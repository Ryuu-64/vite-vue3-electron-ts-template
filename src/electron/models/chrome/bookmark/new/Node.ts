import cheerio from "cheerio";

export class Node {
    text?: string;
    createAt?: string;
    updateAt?: string;
    icon?: string;
    href?: string;
    children?: Node[];
}
