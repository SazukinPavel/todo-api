import { hash } from "bcryptjs";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { TodoEntity } from "./Todo.entity";

@Entity('users')
export class UserEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column({unique:true})
    username:string

    @Column({unique:true})
    email:string
    
    @Column()
    password:string

    @Column({nullable:true})
    bio:string

    @Column()
    role:string

    @OneToMany(()=>TodoEntity,(t)=>t.owner)
    todos:TodoEntity[]

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 3);

    }
}