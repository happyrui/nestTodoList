

/**
 * 校验前端传来的参数字段
 * 类型均是 js 类型
 */

// 创建/更新
// export class todo {
//     summary: string
//     details?: string
//     is_finished?: number
//     is_del?: number
//     id: number
// }


/**
 * 使用管道进行参数校验
 * 需要引入 Validation 相关的 类校验器
 */
import { IsString, IsInt } from 'class-validator';

export class todo {
    
    @IsString()
    summary: string;

    details: string;

    is_finished: number;

    is_del: number;

    id: number;

}