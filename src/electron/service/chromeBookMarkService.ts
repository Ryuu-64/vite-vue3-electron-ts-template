import cheerio from "cheerio";
import {Description} from "../models/chrome/bookmark/new/Description";
import {Anchor} from "../models/chrome/bookmark/new/Anchor";
import {Folder} from "../models/chrome/bookmark/new/Folder";

export const loadChromeBookmark = (html: string) => {
    const $ = cheerio.load(html);

    function parseDt(dtElement: cheerio.Element): Description {
        const $dt = $(dtElement);
        const description: Description = new Description();

        $dt.children().each((_, child) => {
            const $child: cheerio.Cheerio = $(child);
            if ($child.is('a')) {
                description.anchor = new Anchor(
                    $child.text() || '',
                    $child.attr('href') || '',
                    $child.attr('add_date') || '',
                    $child.attr('icon') || ''
                );
                return;
            }

            if ($child.is('dl')) {
                description.folder = new Folder(
                    $dt.children('h3').text().trim(),
                    $dt.children('h3').attr('add_date') || '',
                    $dt.children('h3').attr('last_modified') || '',
                    parseDl($child)
                );
                return;
            }
        });

        return description;
    }

    function parseDl(dlElement: cheerio.Cheerio): Description[] {
        const $dl = $(dlElement);
        const items: Description[] = [];

        $dl.children('dt').each((_, dt) => {
            items.push(parseDt(dt));
        });

        return items;
    }

    function parseBody(bodyElement: cheerio.Cheerio): Description {
        const $body = $(bodyElement);

        const description: Description = new Description();
        description.folder = new Folder(
            $body.children('h1').text().trim(),
            '',
            '',
            parseDl($body.children('dl').first())
        );
        return description;
    }

    const result: Description = parseBody($('body'));
    console.log(JSON.stringify(result, null, 2));
};
