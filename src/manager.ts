import('./env');

import { scrapeNaverKin } from 'libraries/scrape/naver.kin';
import { setIntervalAsync } from 'set-interval-async';
import { Logger } from 'utils/logger.util';

export class ScrapeManager {
  private static instance: ScrapeManager;

  private time: number;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.time = Number(process.env.INTERVAL!);
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ScrapeManager();
    }

    return this.instance;
  }

  public start() {
    Logger.info('Start manger. Interval: %o', { interval: this.time });

    setIntervalAsync(async () => {
      Logger.info('Start Scrape');

      try {
        await scrapeNaverKin();
      } catch (error) {
        Logger.error('Scrape Error: %o', { error });
      }
    }, 60000);
  }
}
