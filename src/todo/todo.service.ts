import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { t_todo as TodoEntity } from '../todo.entity';
import { todo } from './todo.dto';
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
        return await this.todoEntity.findOne({id:id})
    }
    // 增
    async create(todo: todo): Promise<todo> {
        const res = this.todoEntity.create(todo)
        const result = await this.todoEntity.save(res)
        return result;
    }

    //删
    /**
     * 真删除
     */
    async delete(id:number) {
        return await this.todoEntity.delete(id);
    }
    /**
     * 假删除
     */
    // async delete(id:number) {
    //     await this.todoEntity.update(id, {is_del:1})
    // }

    //改
    // async update(todo:todo): Promise<todo> {
    //     await this.todoEntity.createQueryBuilder()
    //     .update()
    //     .set({...todo})
    //     .where("id = :id", { id: todo.id })
    //     .execute();
    //     return await this.todoEntity.findOne({id:todo.id});
    //  }
    async update(todo: todo) {
        return await this.todoEntity.update({id: todo.id}, {...todo})
    }

    // 标记为已完成
    async finish(id:number) {
        return await this.todoEntity.update(id, {is_finished:1})
    }
}
