import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { t_todo as TodoEntity } from '../todo.entity';
import { todo, todoOne, todoList } from './todo.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
    // 注入相关数据库
    constructor(
        @InjectRepository(TodoEntity)
        private readonly todoEntity: Repository<TodoEntity>,
    ) { }

    // 查全部
    async getTodo(): Promise<todo[]> {
        return await this.todoEntity.find();
    }
    // 查一个
    async findOne(id: number): Promise<todo> {
        return this.todoEntity.findOne({id:id})
    }
    // 增
    async create(todo: todo): Promise<todo> {
        const res = this.todoEntity.create(todo)
        const result = await this.todoEntity.save(res)
        return result;
    }

    //删
    async delete(id:number): Promise<todo> {
        const result = await this.todoEntity.findOne(id);
        await this.todoEntity.createQueryBuilder()
        .delete()
        .where("id = :id", {id})
        .execute();
        return result
      }

    //改
    async update(todo:todo): Promise<todo> {
        await this.todoEntity.createQueryBuilder()
        .update()
        .set({...todo})
        .where("id = :id", { id: todo.id })
        .execute();
        return await this.todoEntity.findOne({id:todo.id});
      }
}
