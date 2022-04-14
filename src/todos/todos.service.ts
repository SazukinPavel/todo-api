import { PaginationQueryDto } from './dto/PaginationQuery.dto';
import { UpdateTodoDto } from './dto/UpdateTodo.dto';
import { UserEntity } from 'src/entitys/User.entity';
import { AddTodoDto } from './dto/AddTodo.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TodoEntity } from 'src/entitys/Todo.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class TodosService {

    constructor(@InjectRepository(TodoEntity) private todoRepo:Repository<TodoEntity>){}

    add(dto:AddTodoDto,user:UserEntity){
        return this.todoRepo.save({...dto,owner:user})
    }

    getUserTodo(user:UserEntity,{page,limit}:PaginationQueryDto){ 
        const options:FindManyOptions={where:{owner:user},order:{'createdAt':'ASC'}}
        if(page && limit){
            options.take=limit
            options.skip=limit*page
        }else if(limit){
            options.take=limit
        }
        return this.todoRepo.find(options)
    }

    getUserTodoCount(user:UserEntity){ 
        return this.todoRepo.count({where:{owner:user}})
    }

    async updateTodo(dto:UpdateTodoDto,user:UserEntity){
        const todo=await this.findById(dto.id)
        if(!todo){
            throw new HttpException('Нету заметки с таким id',HttpStatus.BAD_REQUEST)
        }
        if(todo.owner.id!==user.id){
            throw new HttpException('Вы не владелец заметки с этим id',HttpStatus.BAD_REQUEST)
        }
        return this.todoRepo.update(dto.id,{...dto})
    }

    async deleteTodo(id:string,user:UserEntity){
        const todo=await this.findById(id)
        if(!todo){
            throw new HttpException('Нету заметки с таким id',HttpStatus.BAD_REQUEST)
        }
        if(!(todo.owner.id===user.id)){
            throw new HttpException('Вы не владелец заметки с этим id',HttpStatus.BAD_REQUEST)
        }
        return this.todoRepo.delete(id)
    }
    
    private findById(id:string){
        return this.todoRepo.findOne({where:{id},relations:['owner']})
    }
}
