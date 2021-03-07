import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { EditTodoDTO } from './dto/edit-todo.dto';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  findAll(): Promise<Todo[]> {
    return this.todosService.findAll();
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDTO): Promise<Todo> {
    const { title, sprintTotal, sprintDone, todoDone } = createTodoDto;
    return this.todosService.create(title, sprintTotal, sprintDone, todoDone);
  }

  @Patch()
  editOne(@Body() editTodoDto: EditTodoDTO): Promise<Todo> {
    return this.todosService.editOne(editTodoDto);
  }
}
