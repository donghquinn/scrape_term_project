import { Injectable } from '@nestjs/common';
import { NaverError } from 'errors/naver.error';
import { PrismaService } from 'libraries/prisma.lib';
import { Parser } from 'json2csv';
import { Logger } from 'utils/logger.util';
import fs from 'fs';

@Injectable()
export class NaverKinProvider {
  constructor(private readonly prisma: PrismaService) {}

  async getCounts() {
    try {
      const count = await this.prisma.naverKin.count({ select: { uuid: true } });

      Logger.info('Total Counts: %o', { count });

      return count.uuid;
    } catch (error) {
      throw new NaverError(
        'Naver Provider',
        'Failed to Get Counts',
        error instanceof Error ? error : new Error(JSON.stringify(error)),
      );
    }
  }

  async getCategoryCounts() {
    try {
      const categoriesCount = await this.prisma.naverKin.groupBy({
        by: ['category'],
        _count: {
          category: true,
        },
        orderBy: {
          _count: { category: 'desc' },
        },
      });

      Logger.info('Categories: %o', { categoriesCount });

      return categoriesCount;
    } catch (error) {
      throw new NaverError(
        'Naver Provider',
        'Failed to Get Category Counts',
        error instanceof Error ? error : new Error(JSON.stringify(error)),
      );
    }
  }

  async saveIntoCsv() {
    try {
      const data = await this.prisma.naverKin.findMany();

      const fields = ['title', 'category', 'content', 'link', 'create'];

      const opts = { fields };

      const json2csvParser = new Parser(opts);

      const csv = json2csvParser.parse(data);

      fs.writeFileSync('./files/naver.csv', csv);

      Logger.info('Saved Into CSV File');

      return 'Saved into csv File';
    } catch (error) {
      throw new NaverError(
        'Naver Provider',
        'Failed to Save into Csv File',
        error instanceof Error ? error : new Error(JSON.stringify(error)),
      );
    }
  }
}
