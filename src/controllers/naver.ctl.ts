import { Controller, Get } from '@nestjs/common';
import { SetErrorResponse, SetResponse } from 'dto/response.dto';
import { NaverKinProvider } from 'libraries/providers/naver.provider';

@Controller('naver')
export class NaverKin {
  constructor(private readonly naver: NaverKinProvider) {}

  @Get('categories')
  async getCategoriesCount() {
    try {
      const categoryCount = await this.naver.getCategoryCounts();

      return new SetResponse(200, { categoryCount });
    } catch (error) {
      return new SetErrorResponse(500, { error });
    }
  }

  @Get('count')
  async getCount() {
    try {
      const count = this.naver.getCounts();

      return new SetResponse(200, { count });
    } catch (error) {
      return new SetErrorResponse(500, { error });
    }
  }
}
