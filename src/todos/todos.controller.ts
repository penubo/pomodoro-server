import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Patch(':id')
  editOne(
    @Body() editTodoDto: EditTodoDTO,
    @Param('id') id: number,
  ): Promise<Todo> {
    return this.todosService.editOne({ id, ...editTodoDto });
  }
}
