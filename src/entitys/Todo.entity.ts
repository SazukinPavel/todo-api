import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

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

}