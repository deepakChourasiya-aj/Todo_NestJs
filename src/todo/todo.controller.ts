import {
  Controller,
  Post,
  Patch,
  Query,
  Body,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { IdDto } from './dto/get-todo-id.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    console.log(createTodoDto);
    return this.todoService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Get(':id')
  async findOne(@Param() idDto: IdDto) {
    const todo = await this.todoService.findOne(idDto);
    if (todo) {
      return todo;
    } else {
      return { message: 'todo not found wrong id.' };
    }
  }

  @Patch(':id')
  async update(@Param() idDto: IdDto, @Body() updateTodoDto: UpdateTodoDto) {
    const todo = await this.todoService.update(idDto, updateTodoDto);
    if (todo) {
      return todo;
    } else {
      return { message: 'Todo not found' };
    }
  }

  @Delete(':id')
  async delete(@Param() idDto: IdDto) {
    const todo = await this.todoService.delete(idDto);
    if (todo) {
      return todo;
    } else {
      return { message: 'Todo not found' };
    }
  }
}
