import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { t_todo } from './todo.entity'


@Module({
    // imports: [TypeOrmModule.forFeature([t_todo])],
    controllers: [TodoController],
    providers: [TodoService],
    exports: [TodoService]
})
export class TodoModule {}
