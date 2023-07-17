import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo, TodoDocument } from './todo.schema';
import { CreateTodoDto } from '../dto/create-todo.dto';
import { UpdateTodoDto } from '../dto/update-todo.dto';

@Injectable()
export class TodoEntity {
  constructor(
    @InjectModel(Todo.name, 'todos')
    private readonly todoModel: Model<TodoDocument>,
  ) {}

  // create queries
  async create(todo: CreateTodoDto): Promise<TodoDocument> {
    return this.todoModel.create({ ...todo });
  }

  async get(query: any): Promise<TodoDocument[]> {
    if (query == 'all') {
      return this.todoModel.find({});
      // return all todos;
    } else {
      return this.todoModel.find({ _id: query });
    }
  }

  async update(todoId: string, todo: UpdateTodoDto): Promise<TodoDocument> {
    return this.todoModel.findByIdAndUpdate(
      { _id: todoId },
      { ...todo },
      { new: true },
    );
  }

  async delete(todoId: string): Promise<TodoDocument> {
    return this.todoModel.findByIdAndDelete({ _id: todoId }, { new: true });
  }
}
