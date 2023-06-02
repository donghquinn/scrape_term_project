import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { load } from 'cheerio';
import { NaverError } from 'errors/naver.error';
import { ScrapeLogger } from 'utils/logger.util';

export const scrapeNaverKin = async () => {
  const titleArray: Array<string> = [];
  const hrefArray: Array<string> = [];
  const categoryArray: Array<string> = [];
  const contentArray: Array<string> = [];

  titleArray.length = 0;
  hrefArray.length = 0;
  categoryArray.length = 0;
  contentArray.length = 0;

  const prisma = new PrismaClient();

  try {
    ScrapeLogger.info('Naver KIN Scraping');

    const url = 'https://kin.naver.com/qna/list.naver';

    const response = await axios.get(url);

    ScrapeLogger.info('Request HTML');

    const html = load(response.data);

    html('table.boardtype2')
      .children('tbody')
      .children('tr')
      .each((index, item) => {
        const base = html(item);

        const title = base.children('td.title').children('a').text();
        const href = base.children('td.title').children('a').attr('href')?.split('?')[1];
        const category = base.children('td.field').children('a').text();

        ScrapeLogger.info('Received Data');

        hrefArray.push('https://kin.naver.com/qna/detail.naver?' + href!);
        titleArray.push(title!);
        categoryArray.push(category!);
      });

    for (let i = 0; i < hrefArray.length - 1; i += 1) {
      ScrapeLogger.info('Naver Content Scrape');

      const response1 = await axios.get(hrefArray[i]);

      const html2 = load(response1.data);

      const content = html2('div.c-heading__content').contents().text();

      ScrapeLogger.info('Found Content');

      contentArray.push(content);
      //   console.log(`Content: ${hrefArray[i]}, %o`, { content });
    }

    for (let a = 0; a <= contentArray.length - 1; a += 1) {
      ScrapeLogger.info('Insert Data into DB');

      await prisma.naverKin.create({
        data: {
          title: titleArray[a],
          content: contentArray[a],
          category: categoryArray[a],
          link: hrefArray[a],
        },
      });

      ScrapeLogger.info(`Created Data finished: %o`, { title: titleArray[a] });
    }

    ScrapeLogger.info('Finished');

    return { hrefArray, titleArray, categoryArray };
  } catch (error) {
    ScrapeLogger.error('Error: %o', { error: error instanceof Error ? error : new Error(JSON.stringify(error)) });

    throw new NaverError(
      'Naver KIN Scrape',
      'Scrape Error',
      error instanceof Error ? error : new Error(JSON.stringify(error)),
    );
  }
};

await scrapeNaverKin();
