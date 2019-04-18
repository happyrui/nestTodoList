import { HttpStatus, HttpException } from '@nestjs/common';

// 扩展和定制快捷过滤器对象
/**
 * 自定义异常处理
 * 接受参数
 */

export class ValidateException extends HttpException {
    constructor(name) {
      super({
        message: `error message is ${name}`,
        statusCode: HttpStatus.FORBIDDEN
      }, 403);
    }
  }