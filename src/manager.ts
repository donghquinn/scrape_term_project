import { scrapeNaverKin } from 'libraries/scrape/naver.kin';
import { setIntervalAsync } from 'set-interval-async';

export class ScrapeManager {
  private static instance: ScrapeManager;

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ScrapeManager();
    }

    return this.instance;
  }

  public start() {
    setIntervalAsync(async () => {
      await scrapeNaverKin();
    }, 60000);
  }
}
