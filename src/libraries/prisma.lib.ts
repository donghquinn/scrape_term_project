import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  async Init() {
    await this.$connect();
  }

  stopping(connection: INestApplication) {
    this.$on('beforeExit', async () => {
      await connection.close();
    });
  }
}
