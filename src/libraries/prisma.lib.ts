import { PrismaClient } from '@prisma/client';

export class PrismaLibrary extends PrismaClient {
  async Init() {
    await this.$connect();
  }
}
