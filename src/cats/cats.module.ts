import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatService } from './cats.service';

// 每个模块都是一个共享模块。一旦创建就能被任意模块重复使用。假设我们将在几个模块之间共享 CatsService 实例。 我们需要把 CatsService 放到 exports 数组中
// 使模块成为 全局模块
// @Global()
// @Global 装饰器使模块成为全局作用域。 全局模块应该只注册一次，最好由根或核心模块注册。 之后，CatsService 组件将无处不在，但 CatsModule 不会被导入。
@Module({
    imports:[],
    controllers: [CatsController],
    providers: [CatService]
})
export class CatsModule {}
