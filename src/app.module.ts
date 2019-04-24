import { Module, NestModule, MiddlewareConsumer, forwardRef } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatService } from './cats/cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { Connection } from 'typeorm';
import { TodoModule } from './todo/todo.module';
import { LoggerMiddleware } from './config';
import { CatsModule } from './cats/cats.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// @Module() 装饰器提供了元数据，Nest 用它来组织应用程序结构
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    forwardRef(() =>CatsModule),
    forwardRef(() =>TodoModule)
  ],
  controllers: [ AppController],
  providers: [ AppService],
})
// 中间件不能在 module 中使用， 只能在configure 中注册
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/todo');
  }
}
