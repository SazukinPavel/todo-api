import { TodoEntity } from 'src/entitys/Todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
  imports:[TypeOrmModule.forFeature([TodoEntity])]
})
export class TodosModule {
}
