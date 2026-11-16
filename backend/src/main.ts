import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // AppModule을 기반으로 Nest 애플리케이션을 만든다
  const app = await NestFactory.create(AppModule);
  // 서버가 3000 포트에서 요청을 기다린다.

  app.enableCors({
    origin: 'http://localhost:5173',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      // 정의하지 않은 속성이 들어왔을 때 제거
      whitelist: true,
      // 정의하지 않은 속성이 들어왔을 때 요청을 거부하고 400응답 반환
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
