import { appendFileSync } from 'fs';
import { ScrapeLogger } from 'utils/logger.util';

export const saveAsCSV = (title: string, category: string, field: string) => {
  const csv = `${title},${category},${field}\n`;
  try {
    appendFileSync(`../data/${Date.now() + 'naver.csv'}`, csv);
    ScrapeLogger.info('Created CSV File');
  } catch (err) {
    ScrapeLogger.error('Saving CSV Failed');
  }
};
