import { UpdateTodoDto } from './dto/UpdateTodo.dto';
import { TodosService } from './todos.service';
import { AddTodoDto } from './dto/AddTodo.dto';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { User } from 'src/decorators/User.decorator';
import { AuthGuard } from 'src/guards/AuthGuard';

@Controller('todos')
export class TodosController {

    constructor(private todoService:TodosService){}
    
    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard)
    addTodo(@Body() dto:AddTodoDto,@User() user){
        return this.todoService.add(dto,user)
    }

    @Get()
    @UseGuards(AuthGuard)
    getTodo(@User() user){
        return this.todoService.getUserTodo(user)
    }

    @Put()
    @UsePipes(new ValidationPipe())
    @UseGuards(AuthGuard)
    updateTodo(@Body() dto:UpdateTodoDto,@User() user){
        return this.todoService.updateTodo(dto,user)
    }

    @Delete(':id')
    @UseGuards(AuthGuard)
    deleteTodoById(@Param('id') id:string,@User() user){
        return this.todoService.deleteTodo(id,user)
    }
}
