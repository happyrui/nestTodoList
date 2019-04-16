import { Controller, Get, Post, Put } from '@nestjs/common';
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
    async getTodo(): Promise<todo[]> {
        return this.todoService.getTodo();
    }
    
    // 查一个
    @Post('findDetailById')
    async findOne(id: number): Promise<todo> {
        return this.todoService.findOne(id)
    }
    // 改
    @Put('updateDetail')
    async update(todo:todo): Promise<todo> {
        return this.todoService.update(todo)
    }

    // 删
    @Post('deleteOne')
    async delete(id:number): Promise<todo> {
        return this.todoService.delete(id)
    }

    // 增
    @Post()
    async create(todo: todo): Promise<todo> {
        return this.todoService.create(todo)
    }
}
