import { appendFileSync } from 'fs';
import { Logger } from 'utils/logger.util';

export const saveAsCSV = (title: string, category: string, field: string) => {
  const csv = `${title},${category},${field}\n`;
  try {
    appendFileSync(`../data/${Date.now() + 'naver.csv'}`, csv);
  } catch (err) {
    Logger.error('Saving CSV Failed');
  }
};
