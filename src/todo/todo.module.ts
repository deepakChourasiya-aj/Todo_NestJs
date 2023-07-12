import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TodoService } from './todo.service';
import { TodoEntity } from './entity/todo.entity';
import { TodoController } from './todo.controller';
import { TodoSchema, Todo } from './entity/todo.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Todo.name, schema: TodoSchema }],
      'todos',
    ),
  ],
  controllers: [TodoController],
  providers: [TodoService, TodoEntity],
})
export class TodoModule {}
