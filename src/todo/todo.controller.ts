import { Controller, Get, Post, Put, Body } from '@nestjs/common';
import { TodoService } from './todo.service';
import { todo, todoOne, todoList } from './todo.dto';

@Controller('todo')
export class TodoController {
    // 初始化服务
    constructor(
        private readonly todoService: TodoService
    ){}
    // 查全部
    @Get()
    getTodo() {
        return this.todoService.getTodo();
    }
    
    // 查一个
    @Post('findDetailById')
    findOne(@Body() id: number) {
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
        return this.todoService.finish(id)
    }


}
