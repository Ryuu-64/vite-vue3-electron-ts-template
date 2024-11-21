import cheerio from "cheerio";
import {Description} from "../models/chrome/bookmark/Description";
import {Item} from "../models/chrome/bookmark/Item";
import {Section} from "../models/chrome/bookmark/Section";
import {Nested} from "../models/chrome/bookmark/Nested";
import {DlContent} from "../models/chrome/bookmark/DlContent";
import {Link} from "../models/chrome/bookmark/Link";

export const loadChromeBookmark = (html: string) => {
    const $ = cheerio.load(html);

    const parseDt = (dtElement: cheerio.Element): Item | Link => {
        const $dt = $(dtElement);

        // 检查是否包含 `<a>` 标签
        const $anchor = $dt.children('a');
        if ($anchor.length > 0) {
            // 处理 <a> 标签，提取相关信息
            return new Link(
                $anchor.text().trim(),
                $anchor.attr('href') || '',
                $anchor.attr('add_date') || '',
                $anchor.attr('icon') || undefined
            );
        }

        const text = $dt.clone().children().remove().end().text().trim();
        const children: (Section | Item | Description | Nested)[] = [];

        $dt.children().each((_, child) => {
            const $child: cheerio.Cheerio = $(child);

            if ($child.is('h3')) {
                // 处理 <h3> 元素，提取属性
                children.push(new Section(
                    $child.text().trim(),
                    $child.attr('add_date') || '',
                    $child.attr('last_modified') || '',
                    $child.attr('personal_toolbar_folder') || ''
                ));
            } else if ($child.is('dl')) {
                // 递归处理嵌套 <dl>
                children.push(new Nested(parseDl($child)));
            } else if ($child.is('p')) {
                // 处理 <p> 描述
                children.push(new Description($child.text().trim()));
            }
        });

        return new Item(text, children);
    }

    const parseDl = (dlElement: cheerio.Cheerio): (Item | Link)[] => {
        const $dl = $(dlElement);
        const items: (Item | Link)[] = [];

        $dl.children('dt').each((_, dt) => {
            items.push(parseDt(dt));
        });

        return items;
    }

    const parseBody = (bodyElement: cheerio.Cheerio): DlContent => {
        const $body = $(bodyElement);

        const title = $body.children('h1').text().trim(); // 提取 <h1>
        const dlContent = parseDl($body.children('dl').first()); // 解析 <dl>
        const footer = $body.children('p').last().text().trim(); // 解析 <p>

        return new DlContent('item', {
            text: title,
            children: dlContent,
            footer,
        });
    }

    const result: DlContent = parseBody($('body'));
    console.log(JSON.stringify(result, null, 2));
}
