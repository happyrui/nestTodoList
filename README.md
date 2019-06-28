#### nest
Nest 是一个用于构建高效，可扩展的 Node.js 服务器端应用程序的框架，可以进行CRUD操作。将TypeScript引入Node.js中并基于Express封装。内置很多模块，可以拿来即用。

+ @nestjs/common 提供很多装饰器，log服务等
+ @nestjs/core 核心模块处理底层框架兼容
+ @nestjs/microservices 微服务支持
+ @nestjs/testing 测试套件
+ @nestjs/websockets websocket支持
+ @nestjs/typeorm 数据库处理
+ @nestjs/graphql API查询语言
+ @nestjs/cqrs  命令查询的责任分离Command Query Responsibility Segregation (简称CQRS)模式是一种架构体系模式，能够使改变模型的状态的命令和模型状态的查询实现分离
+ @nestjs/passport 身份验证（v5版支持，不向下兼容）
+ @nestjs/swagger swagger UI API
+ @nestjs/mongoose mongoose模块

实现一个 TodoList 应用
+ UI实现

![UI实现](https://img-blog.csdnimg.cn/20190423142848869.png)

+ 项目解析

![项目解析](https://img-blog.csdnimg.cn/20190423142650505.png)

+ config 异常，管道，中间件，过滤器 使用
+ todo 主要实现todolist的增删改查
+ app.module.ts 组织应用程序结构
+ main.ts 项目配置文件，监听端口

#### 实现

##### 创建文件

在 cli 项目的基础上，创建todo 文件夹，如上，创建一些文件，可以手动创建，当然，也可以使用nest的命令。
generate(简写：g) 生成文件

+ class (简写: cl) 类
+ controller (简写: co) 控制器
+ decorator (简写: d) 装饰器
+ exception (简写: e) 异常捕获
+ filter (简写: f) 过滤器
+ gateway (简写: ga) 网关
+ guard (简写: gu) 守卫
+ interceptor (简写: i) 拦截器
+ middleware (简写: mi) 中间件
+ module (简写: mo) 模块
+ pipe (简写: pi) 管道
+ provider (简写: pr) 供应商
+ service (简写: s) 服务

创建一个users服务文件

``` js
$ nest generate service users
OR
$ nest g s users
```
注意：

 + 必须在项目根目录下创建，（默认创建在src/）。
 + 需要优先新建模块，不然创建的非模块以外的服务，控制器等就会自动注入更新到上级的模块里面
 
 ##### 概念

Nest有三种基本的应用程序构建块

+ 模块 @Module({}) ，提供元数据， 组织应用程序结构

    功能模块：每个功能模块中有一个module，组织该功能的controllers，services，components并输出，在根目录的app.module.ts中引入

+ 控制器 @Controller()，处理HTTP请求

    请求方法：@Get(), @Post(), @Put(), @Delete(), @Patch(), @Options(), @Head(), @All()

+ 组件 @Component()，几乎所有的事物都可以被看作一个组件--Service, Repository, Provider等。

    Provider， 包含应用所需的任何值、函数或特性/定义了用途 的 类.
    使用@Injectable()装饰器，是一个纯粹的JS类，controller将复杂的任务委托给提供者。

##### 引入相关

  既然是后端服务，那当然是要连接数据库了。我们使用 mysql数据库，然后使用typeorm来操作数据库，nest中有内置相关类  `@nest/typeorm`
  ``` js
  $ npm install --save @nestjs/typeorm typeorm mysql
  ```
  两种方式 引入
  
  + 将其 TypeOrmModule 导入到根目录中 ApplicationModule
  
  **app.module.ts**
  ``` js
    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    
    @Module({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: 'root',
          database: 'test',
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
      ],
    })
    export class ApplicationModule {}
  ```
  + 在项目根目录中创建一个 ormconfig.json 文件，会自动识别
  
   **ormconfig.json**
  
    ``` js
    {
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "root",
      "database": "test",
      "entities": ["src/**/**.entity{.ts,.js}"],
      "synchronize": true
    }
    ```
  **app.module.ts**
  ``` js
    import { Module } from '@nestjs/common';
    import { TypeOrmModule } from '@nestjs/typeorm';
    
    @Module({
      imports: [TypeOrmModule.forRoot()],
    })
    export class ApplicationModule {}
  ```
  

##### 业务逻辑

我们想要实现的是一个 todoList 主要操作有 增删改查
    
###### 设计数据库
    
在上面的`ormconfig.json`中 `database: test` 是表示 所要连接的数据库。是需要本地先新建好的。如果没有，就会报错。推荐使用 [Navicat](https://www.navicat.com.cn/products/) 可视化数据库表，更好操作。
    
还有，本地数据库的 用户名，密码都是要在上面设置好的，要统一。
    
然后新建一个实体，运行之后会在 test 数据库中 生成一个相关的表
    
**todo.entity.ts**
    
``` js
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("t_todo")
export class t_todo {

    // 主键 id
    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"id"
        })
    id:number;
        
    // summary
    @Column("varchar",{ 
        nullable:true,
        length:200,
        name:"summary"
        })
    // 这个字段就是输出给前端时的字段，在这里就可以写成 驼峰式的
    summary:string | null;

    // details
    @Column("text",{ 
        nullable:true,
        name:"details"
        })
    details:string | null;

    // 是否已完成
    @Column("int",{ 
        nullable:true,
        name:"is_finished"
        })
    is_finished:number | null;

    // 是否已删除
    @Column("int",{ 
        nullable:true,
        name:"is_del"
        })
    is_del:number | null;

    // 创建时间
    @Column("timestamp",{ 
        nullable:true,
        default: () => "CURRENT_TIMESTAMP",
        name:"create_time"
        })
    createTime:Date | null;
        
    // 更新时间
    @Column("timestamp",{ 
        nullable:true,
        default: () => "CURRENT_TIMESTAMP",
        name:"update_time"
        })
    updateTime:Date | null;
        
}


```
基本的表结构就是这样，然后在 **todo.module.ts**中导入这个实体
    
``` js
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { t_todo } from './todo.entity'


@Module({
    imports: [TypeOrmModule.forFeature([t_todo])],
    controllers: [TodoController],
    providers: [TodoService],
    exports: [TodoService]
})
export class TodoModule {}

```
    
然后 `npm run start:dev` 来生成表
    
![表](https://img-blog.csdnimg.cn/20190425100904863.png)

这样表结构就生成了，接着就是逻辑实现了。


###### 数据传输对象

后端写接口，一定要控制好传入params的数据格式，所以要对操作数据库时数据做类型校验，在ts中推荐使用 DTO（数据传输对象）。

新建一个 **todo.dto.ts**

``` js
export class todo {
    summary: string
    details?: string
    is_finished?: number
    is_del?: number
    id?: number
}

```

###### 路由

接下来可以写请求了，[在controller中实现](https://docs.nestjs.cn/5.0/controllers)
主要是抛出给前端使用的接口，在这里调用服务的方法。

**todo.controller.ts**

``` js
import { Controller, Get, Post, Put, Body, Delete, Param } from '@nestjs/common';
import { TodoService } from './todo.service';
import { todo } from './todo.dto';

@Controller('todo')

export class TodoController {
    // 初始化服务
    constructor( 
        private readonly todoService: TodoService
    ){ }

    @Get()
    root() {
        return this.todoService.root();
    }

    // 查全部
    @Get()
    getTodo() {
        return this.todoService.getTodo();
    }
    
    // 查一个
    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.todoService.findOne(id)
    }

    // 改
    @Post('update')
    update(@Body() todo:todo) {
        return this.todoService.update(todo)
    }

    // 删
    @Post('delete')
    delete(@Body() id:number) {
        return this.todoService.delete(id)
    }

    // 增
    @Post('create')
    create(@Body() todo: todo): Promise<todo> {
        return this.todoService.create(todo)
    }

    //标记已完成
    @Post('finish')
    finish(@Body() id:number) {
        console.log('aaa');
        return this.todoService.finish(id)
    }
    
}

```
    
`@nestjs/common`中封装了很多装饰器，可以拿来即用。这里只涉及简单的request的使用，[了解更多](https://docs.nestjs.cn/5.0/controllers/)

`@Controller('todo')` 表示接口输出的路径，在这个下面写的所有接口都是基于 /todo/ 的。


###### 服务

**todo.service.ts**

``` js
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { t_todo as TodoEntity } from './todo.entity';
import { todo } from './todo.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    // 注入相关数据库
    // @InjectRepository(TodoEntity)
    private readonly todoEntity: Repository<TodoEntity>

    root(): string {
        return 'Hello World!';
    }
    // 查全部
    async getTodo(): Promise<todo[]> {
        return await this.todoEntity.find();
    }
    
    // 查一个
    async findOne(id: number): Promise<todo> {
        return await this.todoEntity.findOne({id:id})
    }

    // 增
    async create(todo: todo): Promise<todo> {
        const res = this.todoEntity.create(todo)
        const result = await this.todoEntity.save(res)
        return result;
    }

    //删
    async delete(id:number) {
        return await this.todoEntity.delete(id);
    }

    // 更新
    async update(todo: todo) {
        return await this.todoEntity.update({id: todo.id}, {...todo})
    }

    // 标记为已完成
    async finish(id:number) {
        return await this.todoEntity.update(id, {is_finished:1})
    }
}


```

Repository 提供了很多可以直接使用的操作数据表的方法。比如 `find()`，`findOne()`，`save()`，`update()`，`delete()` 等

模块是按业务逻辑划分基本单元，包含控制器和服务。控制器是处理请求和响应数据的部件，服务处理实际业务逻辑的部件。

`中间件`是路由处理Handler前的数据处理层，只能在模块或者全局注册，可以做日志处理中间件、用户认证中间件等处理，中间件和express的中间件一样，所以可以访问整个request、response的上下文，模块作用域可以依赖注入服务。全局注册只能是一个纯函数或者一个高阶函数。下一个中间件函数通常由一个名为next的变量表示。

Middleware  

+ 在路由处理之前被调用，用于修改请求/响应对象、周期
+ 不能在@module()列出，需使用configure()设置
+ 全局中间件：main.ts中app.use()

`守卫`是决定请求是否可以到达对应的路由处理器，能够知道当前路由的执行上下文，可以控制器中的类、方法、全局注册使用，可以做角色守卫。简单来说就是权限控制，可以做权限认证，如果你没有权限可以拒绝你访问这个路由，默认返回403错误

`管道`是数据流处理，在中间件后路由处理前做数据处理，可以控制器中的类、方法、方法参数、全局注册使用，只能是一个纯函数。可以做数据验证，数据转换等数据处理。

Pipe    将输入数据转换为所需的输出，处理验证。管道可以把你的请求参数根据特定条件验证类型、对象结构或映射数据。
Nest为我们内置了2个通用的管道，from '@nestjs/common'

+ 数据验证ValidationPipe，配合使用 class-validator class-transformer
+ 数据转换ParseIntPipe

**使用时 dto 对象中也是需要使用  Pipe 的**

`拦截器`是进入控制器之前和之后处理相关逻辑，能够知道当前路由的执行上下文，可以控制器中的类、方法、全局注册使用，可以做日志、事务处理、异常处理、响应数据格式，缓存等。

`过滤器`是捕获错误信息，返回响应给客户端。可以控制器中的类、方法、全局注册使用，可以做自定义响应异常格式。

基本异常处理类 HttpException from '@nestjs/common'

HttpException 接受2个参数：

+ 消息内容，可以是字符串错误消息或者对象{status: 状态码，error：错误消息}
+ 状态码

`中间件、过滤器、管道、守卫、拦截器，这是几个比较容易混淆的东西。他们有个共同点都是和控制器挂钩的中间抽象处理层，但是他们的职责却不一样。`

全局管道、守卫、过滤器和拦截器和任何模块松散耦合。他们不能依赖注入任何服务，因为他们不属于任何模块。
可以使用控制器作用域、方法作用域或辅助作用域仅由管道支持，其他除了中间件是模块作用域，都是控制器作用域和方法作用域。

**重点**：在示例给出了它们的写法，注意全局管道、守卫、过滤器和拦截器，只能new，全局中间件是纯函数，全局管道、守卫、过滤器和拦截器，中间件都不能依赖注入。中间件模块注册也不能用new，可以依赖注入。管道、守卫、过滤器和拦截器局部注册可以使用new和类名，除了管道以为其他都可以依赖注入。拦截器和守卫可以写成高阶方法来传参，达到定制目的。

管道、过滤器、拦截器守卫都有各自的具体职责。拦截器和守卫与模块结合在一起，而管道和过滤器则运行在模块区域之外。管道任务是根据特定条件验证类型、对象结构或映射数据。过滤器任务是捕获各种错误返回给客户端。管道不是从数据库中选择或调用任何服务的适当位置。另一方面来说，拦截器不应该验证对象模式或修饰数据。如果需要重写，则必须由数据库调用服务引起。守卫决定了哪些路由可以访问，它接管你的验证责任。

执行顺序是什么：
```
客户端请求 ---> 中间件 ---> 守卫 ---> 拦截器之前 ---> 管道 ---> 控制器处理并响应 ---> 拦截器之后 ---> 过滤器
```