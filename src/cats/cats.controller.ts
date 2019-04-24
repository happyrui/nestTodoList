import { Controller, Get, Post, Inject } from '@nestjs/common';
import { CatService } from './cats.service';
// controller 处理接口发送请求之类的
// 会使用到很多装饰器

@Controller('cats')
export class CatsController {
    constructor(private readonly catService: CatService) {}
    // getCat() 方法前的 @Get() 修饰符告诉 Nest 创建此路由路径的端点，并将每个相应的请求映射到此处理程序。
    // 由于我们为每个路由（cats）声明了前缀，所以 Nest 会在这里映射每个 /cats 的 GET 请求
    @Get()
    getCat(): string {
        return this.catService.getCat();
    }
    @Post()
    async create(): Promise<string> {
        return 'create an apple'
    }
    // Nest以相同的方式提供其余的端点装饰器- @Put() 、 @Delete()、 @Patch()、 @Options()、 @Head()和 @All()。这些表示各自的HTTP请求方法
    // 理解  端点，装饰器
    // 端点： 接口请求  装饰器： 修饰符，修饰类及类的方法，用来修改类的行为

}
