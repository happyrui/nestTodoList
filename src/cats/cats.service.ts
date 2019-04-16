import { Injectable } from '@nestjs/common';

//  服务 
// 提供者
@Injectable()
export class CatService {
  getCat(): string {
    return 'Hello World!';
  }
  create(): string {
      return 'as'
  }
}
