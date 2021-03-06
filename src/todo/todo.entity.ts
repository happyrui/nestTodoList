/**
 * 校验数据库字段
 * 类型均是 数据库 类型
 */
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("t_todo")
export class t_todo {

    // 主键 id
    @PrimaryGeneratedColumn({
        type:"bigint", 
        name:"id"
        })
    id:number;
        
    // summary
    @Column("varchar",{ 
        nullable:true,
        length:200,
        name:"summary"
        })
    // 这个字段就是输出给前端时的字段，在这里就可以写成 驼峰式的
    summary:string | null;

    // details
    @Column("text",{ 
        nullable:true,
        name:"details"
        })
    details:string | null;

    // 是否已完成
    @Column("int",{ 
        nullable:true,
        name:"is_finished"
        })
    is_finished:number | null;

    // 是否已删除
    @Column("int",{ 
        nullable:true,
        name:"is_del"
        })
    is_del:number | null;

    // 创建时间
    @Column("timestamp",{ 
        nullable:true,
        default: () => "CURRENT_TIMESTAMP",
        name:"create_time"
        })
    createTime:Date | null;
        
    // 更新时间
    @Column("timestamp",{ 
        nullable:true,
        default: () => "CURRENT_TIMESTAMP",
        name:"update_time"
        })
    updateTime:Date | null;
        
}
