import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatService } from './cats/cats.service';

// @Module() 装饰器提供了元数据，Nest 用它来组织应用程序结构
@Module({
  imports: [],
  controllers: [AppController, CatsController],
  providers: [AppService,CatService],
})
export class AppModule {}
