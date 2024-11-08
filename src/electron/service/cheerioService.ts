import cheerio from "cheerio";

export const setupCheerioService = () => {
    const html = `
  <html>
    <body>
      <h1>Main Title</h1>
      <p class="description">Some description here.</p>
      <div class="links">
        <a href="https://example.com/page1">Page 1</a>
        <a href="https://example.com/page2">Page 2</a>
      </div>
    </body>
  </html>
`;

    const $ = cheerio.load(html);

// 获取标题
    const title = $('h1').text();
    console.log('Title:', title);

// 获取描述内容
    const description = $('.description').text();
    console.log('Description:', description);

// 遍历链接
    $('.links a').each((_, element) => {
        const linkText = $(element).text();
        const linkHref = $(element).attr('href');
        console.log(`Link: ${linkText}, URL: ${linkHref}`);
    });
}
