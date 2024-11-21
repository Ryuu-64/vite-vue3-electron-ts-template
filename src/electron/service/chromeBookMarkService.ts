import cheerio from "cheerio";
import {Description} from "../models/chrome/bookmark/Description";
import {Item} from "../models/chrome/bookmark/Item";
import {Section} from "../models/chrome/bookmark/Section";
import {Nested} from "../models/chrome/bookmark/Nested";
import {DlContent} from "../models/chrome/bookmark/DlContent";
import {Link} from "../models/chrome/bookmark/Link";
import {DescriptionTermBranchNode} from "../models/chrome/bookmark/new/DescriptionTermBranchNode";
import {DescriptionTermLeafNode} from "../models/chrome/bookmark/new/DescriptionTermLeafNode";
import {DescriptionList} from "../models/chrome/bookmark/new/DescriptionList";

// export const loadChromeBookmark = (html: string) => {
//     const $ = cheerio.load(html);
//
//     const parseDt = (dtElement: cheerio.Element): Item | Link => {
//         const $dt = $(dtElement);
//
//         // 检查是否包含 `<a>` 标签
//         const $anchor = $dt.children('a');
//         if ($anchor.length > 0) {
//             // 处理 <a> 标签，提取相关信息
//             return new Link(
//                 $anchor.text().trim(),
//                 $anchor.attr('href') || '',
//                 $anchor.attr('add_date') || '',
//                 $anchor.attr('icon') || undefined
//             );
//         }
//
//         const text = $dt.clone().children().remove().end().text().trim();
//         const children: (Section | Item | Description | Nested)[] = [];
//
//         $dt.children().each((_, child) => {
//             const $child: cheerio.Cheerio = $(child);
//
//             if ($child.is('h3')) {
//                 // 处理 <h3> 元素，提取属性
//                 children.push(new Section(
//                     $child.text().trim(),
//                     $child.attr('add_date') || '',
//                     $child.attr('last_modified') || '',
//                     $child.attr('personal_toolbar_folder') || ''
//                 ));
//             } else if ($child.is('dl')) {
//                 // 递归处理嵌套 <dl>
//                 children.push(new Nested(parseDl($child)));
//             } else if ($child.is('p')) {
//                 // 处理 <p> 描述
//                 children.push(new Description($child.text().trim()));
//             }
//         });
//
//         return new Item(text, children);
//     }
//
//     const parseDl = (dlElement: cheerio.Cheerio): (Item | Link)[] => {
//         const $dl = $(dlElement);
//         const items: (Item | Link)[] = [];
//
//         $dl.children('dt').each((_, dt) => {
//             items.push(parseDt(dt));
//         });
//
//         return items;
//     }
//
//     const parseBody = (bodyElement: cheerio.Cheerio): DlContent => {
//         const $body = $(bodyElement);
//
//         const title = $body.children('h1').text().trim(); // 提取 <h1>
//         const dlContent = parseDl($body.children('dl').first()); // 解析 <dl>
//         const footer = $body.children('p').last().text().trim(); // 解析 <p>
//
//         return new DlContent('item', {
//             text: title,
//             children: dlContent,
//             footer,
//         });
//     }
//
//     const result: DlContent = parseBody($('body'));
//     console.log(JSON.stringify(result, null, 2));
// }

export const loadChromeBookmark = (html: string) => {
    const $ = cheerio.load(html);

    // 递归解析 <dl>
    function parseDl(dlElement: cheerio.Cheerio): DescriptionTermBranchNode {
        const dlNode = new DescriptionTermBranchNode();
        const terms: DescriptionTermLeafNode[] = [];

        $(dlElement).children('dt').each((_, dtElement) => {
            const termNode = parseDt(dtElement); // 解析每个 <dt> 为叶子节点
            terms.push(termNode);
        });

        // 将解析后的子项赋值给 DescriptionTermBranchNode
        dlNode.dl = terms;
        return dlNode;
    }

    // 解析每个 <dt>
    function parseDt(dtElement: cheerio.Element): DescriptionTermLeafNode {
        const $dt = $(dtElement);
        const termNode = new DescriptionTermLeafNode();

        // 解析 <a> 标签（如果存在）
        const $a = $dt.find('a');
        if ($a.length) {
            termNode.href = $a.attr('href') || ''; // 获取 href
            termNode.text = $a.text().trim(); // 获取文本
            termNode.createAt = $a.attr('add_date') || ''; // 获取创建时间
        } else {
            // 如果没有 <a>，就直接将 <dt> 的文本作为内容
            termNode.text = $dt.text().trim();
        }

        return termNode;
    }

    // 解析 <body> 中的书签结构
    const parseBody = (bodyElement: cheerio.Cheerio) => {
        const $body = $(bodyElement);
        const title = $body.children('h1').text().trim();
        const dlContent = parseDl($body.children('dl').first());
        return { title, dlContent };
    };

    const result = parseBody($('body')); // 执行解析
    console.log(JSON.stringify(result, null, 2));
};