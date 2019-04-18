import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 自定义封装的过滤器和管道
import { HttpExceptionFilter, ValidatePipe } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 过滤器 在全局注册使用内置实例方法useGlobalFilters，作用整个项目
  app.useGlobalFilters(new HttpExceptionFilter());
  // 管道
  app.useGlobalPipes(new ValidatePipe());
  await app.listen(3000);
}
bootstrap();
