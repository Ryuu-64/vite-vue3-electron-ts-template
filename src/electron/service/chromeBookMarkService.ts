import cheerio from "cheerio";

export const loadChromeBookmark = (html: string) => {
// 加载 HTML 内容到 Cheerio
    const $ = cheerio.load(html);
    const aTextArray: string[] = [];
    $('a').each((index, el) => {
        const text: string = $(el).text();
        aTextArray.push(text);
    });
    console.log(aTextArray)
}