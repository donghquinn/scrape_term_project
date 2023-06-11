import axios from 'axios';
import { load } from 'cheerio';
import { NaverError } from 'errors/naver.error';
import { PrismaService } from 'libraries/prisma.lib';
import { ScrapeLogger } from 'utils/logger.util';

export const scrapeNaverKin = async () => {
  const contentArray: Array<string> = [];

  contentArray.length = 0;

  const prisma = new PrismaService();

  try {
    ScrapeLogger.info('Naver KIN Scraping');

    const url = 'https://kin.naver.com/qna/list.naver';

    const { titleArray, hrefArray, categoryArray } = await scrapeKinList(url);

    for (let i = 0; i < hrefArray.length - 1; i += 1) {
      const content = await scrapeContent(hrefArray[i]);

      contentArray.push(content);
    }

    for (let a = 0; a <= contentArray.length - 1; a += 1) {
      await prisma.naverKin.create({
        data: {
          title: titleArray[a],
          content: contentArray[a],
          category: categoryArray[a],
          link: hrefArray[a],
        },
      });
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

export const scrapeKinList = async (url: string) => {
  try {
    const titleArray: Array<string> = [];
    const hrefArray: Array<string> = [];
    const categoryArray: Array<string> = [];

    titleArray.length = 0;
    hrefArray.length = 0;
    categoryArray.length = 0;

    const response = await axios.get<string>(url);

    ScrapeLogger.info('Request HTML');

    const html = load(response.data);

    html('table.boardtype2')
      .children('tbody')
      .children('tr')
      .each((index, item) => {
        const base = html(item);

        const title = base
          .children('td.title')
          .children('a')
          .text()
          .replace(/[\n\t\r]/g, '');

        const href = base.children('td.title').children('a').attr('href')?.split('?')[1];
        const category = base.children('td.field').children('a').text();

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        hrefArray.push(`https://kin.naver.com/qna/detail.naver?${href!}`);
        titleArray.push(title);
        categoryArray.push(category);
      });

    return { titleArray, hrefArray, categoryArray };
  } catch (error) {
    ScrapeLogger.error('Error: %o', { error: error instanceof Error ? error : new Error(JSON.stringify(error)) });

    throw new NaverError(
      'Naver KIN Scrape',
      'Scrape Error',
      error instanceof Error ? error : new Error(JSON.stringify(error)),
    );
  }
};

export const scrapeContent = async (url: string) => {
  try {
    const response1 = await axios.get<string>(url);

    const html2 = load(response1.data);

    let content = html2('div.c-heading__content').contents().text();

    content = content.replace(/[\n\t\r]/g, '');

    return content;
  } catch (error) {
    ScrapeLogger.error('Error: %o', { error: error instanceof Error ? error : new Error(JSON.stringify(error)) });

    throw new NaverError(
      'Naver KIN Scrape',
      'Scrape Error',
      error instanceof Error ? error : new Error(JSON.stringify(error)),
    );
  }
};
