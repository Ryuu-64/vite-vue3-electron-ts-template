import cheerio from "cheerio";
import {Node} from "../models/chrome/bookmark/new/Node";

export const loadChromeBookmark = (html: string) => {
    const $ = cheerio.load(html);
    let $body = $('body');
    const node: Node = parse($body);
    initializeBody(node, $body);
    console.log(JSON.stringify(node, null, 2));

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
