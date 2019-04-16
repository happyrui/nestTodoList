

/**
 * 校验前端传来的参数字段
 * 类型均是 js 类型
 */


// 删除/标记已完成/查找一个
export class todoOne {
    todoId: number
}

// 创建/更新
export class todo {
    summary: string
    details?: string
    create_time?: Date
    is_finished?: boolean
    id?: number
}

// 数据列表
export class todoList {
    todo: todo[]
    totolCount: number
}