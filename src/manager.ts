import { scrapeNaverKin } from 'libraries/scrape/naver.kin';
import { setIntervalAsync } from 'set-interval-async';
import { Logger } from 'utils/logger.util';

export class ScrapeManager {
  private static instance: ScrapeManager;

  private time: number;

  constructor() {
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
    }, this.time);
  }
}
