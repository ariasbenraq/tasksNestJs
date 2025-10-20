import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const logger = new Logger('Bootstrap');

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 4000);
  logger.log(`Application is running on port: ${process.env.PORT ?? 4000}`);
}
bootstrap();
