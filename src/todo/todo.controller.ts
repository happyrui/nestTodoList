import { Controller, Get, Post, Put, Body, Delete, Param } from '@nestjs/common';
// 异常处理相关
import { HttpException, HttpStatus, UseFilters } from '@nestjs/common';
// 管道相关
import { UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
// 文件上传
import { UploadedFile, FileInterceptor, UseInterceptors } from '@nestjs/common';
import { HttpExceptionFilter, ValidateException, ValidatePipe } from '../config';
import { TodoService } from './todo.service';
import { todo } from './todo.dto';
import fs = require('fs');
import path = require('path');

@Controller('todo')
// Exception1、作用于当前控制器路由的所有响应结果
// @UseFilters(HttpExceptionFilter)
// Pipe3、在@UsePipes()装饰器里面使用，作用当前控制器路由所有的请求参数
// @UsePipes(ValidationPipe)
export class TodoController {
    // 初始化服务
    constructor(
        private readonly todoService: TodoService
    ){}
    // 查全部
    @Get()
    // Exception2、作用于当前路由的响应结果
    // @UseFilters(HttpExceptionFilter)
    getTodo() {
        return this.todoService.getTodo();
    }
    
    // 查一个
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.todoService.findOne(id)
    }

    // 改
    @Post('update')
    update(@Body() todo:todo) {
        // 基本异常类
        if(!todo.summary){
            throw new HttpException({ message: '概述必填', statusCode: 403 }, HttpStatus.FORBIDDEN)
        } else {
            return this.todoService.update(todo)
        }
    }

    // 删
    @Post('delete')
    delete(@Body() id:number) {
        return this.todoService.delete(id)
    }

    // 增
    @Post('create')
    // Pipe2、在@UsePipes()装饰器里面使用，作用当前这条路由所有的请求参数
    // @UsePipes(ValidationPipe)
    // Pipe1、直接@Body()装饰器里面使用，只作用当前body这个参数
    create(@Body() todo: todo): Promise<todo> {
    // create(@Body(ValidationPipe) todo: todo): Promise<todo> {
        // 基本异常类
        // if(!todo.summary){
        //     throw new HttpException({ message: '概述必填', statusCode: 403 }, HttpStatus.FORBIDDEN)
        // } else {
        //     return this.todoService.create(todo)
        // }

        // Exception3、使用全局异常处理
        if(!todo.summary){
            // 对HttpException 进行自定义封装
            throw new ValidateException('summary')
        } else {
            return this.todoService.create(todo)
        }
        return this.todoService.create(todo)
    }
    // Pipe4、在全局注册使用内置实例方法useGlobalPipes，作用整个项目
    // 在main.js中注册
    //标记已完成
    @Post('finish')
    finish(@Body() id:number) {
        console.log('aaa');
        return this.todoService.finish(id)
    }

    // 上传文件
    @Post('upload')
    // 设置拦截器
    // FileInterceptor () 与处理程序绑定在一起
    @UseInterceptors(FileInterceptor('file'))
    // UploadedFile 装饰器 从 request 中取出 file
    upload(@UploadedFile() file) {
        console.log(file);
        const storePath = path.join(__dirname, '../../files');
        fs.existsSync(storePath) === false && this.mkdirs(storePath);
        const resPath = path.join(storePath, file.originalname);
        fs.writeFileSync(resPath, file.buffer);
    }
    // 判断文件夹是否已存在
    mkdirs(dirpath) {
        if (!fs.existsSync(path.dirname(dirpath))) {
            this.mkdirs(path.dirname(dirpath));
        }
        fs.mkdirSync(dirpath);
    }
    
}
