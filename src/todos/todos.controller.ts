import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTodoDTO } from './dto/create-todo.dto';
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
  async create(@Body() createTodoDto: CreateTodoDTO): Promise<Todo> {
    const { title, sprintTotal, sprintDone, todoDone } = createTodoDto;
    return await this.todosService.create(
      title,
      sprintTotal,
      sprintDone,
      todoDone,
    );
  }
}
