import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

async function bootstrap() {
  const PORT = 8000 || process.env.PORT;
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(PORT, () => console.log(`server works on ${PORT}`));
}
bootstrap();

