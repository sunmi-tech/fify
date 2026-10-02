import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  // AppModule을 기반으로 Nest 애플리케이션을 만든다
  const app = await NestFactory.create(AppModule);
  // 서버가 3000 포트에서 요청을 기다린다.
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
