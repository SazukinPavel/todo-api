import { UserEntity } from 'src/entitys/User.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity('todos')
export class TodoEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @CreateDateColumn()
    createdAt:string

    @UpdateDateColumn()
    updatedAt:string

    @Column()
    title:string

    @Column()
    description:string

    @ManyToOne(()=>UserEntity,u=>u.todos)
    owner:UserEntity

}