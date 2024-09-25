import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './lib/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(Number(PORT));
}
bootstrap();
