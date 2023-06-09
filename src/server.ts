import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';
import { MainModule } from 'modules/main.module';
import { Logger } from 'utils/logger.util';

export const bootstrap = async () => {
  const port = Number(process.env.APP_POPT);
  const app = await NestFactory.create<NestExpressApplication>(MainModule);

  app.use(helmet());
  app.set('trust proxy', 1);
  app.enableVersioning();
  app.useBodyParser('json');
  app.enableCors();

  await app.listen(port, '0.0.0.0');

  const message = 'Server Started';
  const wrapper = '@'.repeat(message.length);

  Logger.info(wrapper);
  Logger.info(message);
  Logger.info(wrapper);
};
