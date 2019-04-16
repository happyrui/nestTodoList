import { Injectable } from '@nestjs/common';

//  服务 
// 提供者
@Injectable()
export class CatService {
  getCat(): string {
    return 'Hello World!aaaa';
  }
  create(): string {
      return 'asaaaa'
  }
}
