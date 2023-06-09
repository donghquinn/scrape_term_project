import { Module } from '@nestjs/common';
import { NaverKin } from 'controllers/naver.ctl';
import { PrismaService } from 'libraries/prisma.lib';
import { NaverKinProvider } from 'libraries/providers/naver.provider';

@Module({
  providers: [NaverKinProvider, PrismaService],
  controllers: [NaverKin],
})
export class NaverModule {}
