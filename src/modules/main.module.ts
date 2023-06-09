import { Module } from '@nestjs/common';
import { NaverModule } from './naver.modules';

@Module({
  imports: [NaverModule],
})
export class MainModule {}
