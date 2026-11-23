import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { GoalsModule } from './goals/goals.module.js';
// ConfigModule은 NestJS에서 환경 설정을 관리하는 모듈
import { ConfigModule } from '@nestjs/config';

// AppModule은 애플리케이션을 구성하는 부품들을 NestJS에 알려준다.
// Module은 관련된 기능들을 하나의 단위로 묶는 역할을 한다.
@Module({
  // forRoot()는 환경 설정을 초기화하는 역할을 함.
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GoalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
