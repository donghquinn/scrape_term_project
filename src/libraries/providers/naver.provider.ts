import { Injectable } from '@nestjs/common';
import { NaverError } from 'errors/naver.error';
import { PrismaService } from 'libraries/prisma.lib';
import { Logger } from 'utils/logger.util';

@Injectable()
export class NaverKinProvider {
  constructor(private readonly prisma: PrismaService) {}

  async getCounts() {
    try {
      const count = await this.prisma.naver.count();

      Logger.info('Total Counts: %o', { count });

      return count;
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
      const categoriesCount = await this.prisma.naver.groupBy({
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
}
