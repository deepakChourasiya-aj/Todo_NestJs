import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoEntity } from './entity/todo.entity';
import { IdDto } from './dto/get-todo-id.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly todoEntity: TodoEntity) {}
  async create(createTodoDto: CreateTodoDto) {
    return this.todoEntity.create(createTodoDto);
  }
  findAll() {
    return this.todoEntity.get('all');
  }

  findOne(idDto: IdDto) {
    return this.todoEntity.get(idDto.id);
  }

  update(data: any, updateTodoDto: UpdateTodoDto) {
    return this.todoEntity.update(data.id, updateTodoDto);
  }

  delete(idDto: IdDto) {
    return this.todoEntity.delete(idDto.id);
  }
}
