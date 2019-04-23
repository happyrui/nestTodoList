import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { CatsController } from './cats/cats.controller';
import { CatService } from './cats/cats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { Connection } from 'typeorm';
import { TodoModule } from './todo/todo.module';
import { LoggerMiddleware } from './config';

// @Module() 装饰器提供了元数据，Nest 用它来组织应用程序结构
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TodoModule
  ],
  controllers: [ CatsController, TodoController],
  providers: [ CatService, TodoService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('/todo');
  }
}
