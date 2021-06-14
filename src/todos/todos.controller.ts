import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
} from '@nestjs/common';
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

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Todo> {
    return this.todosService.findOne(id);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDTO): Promise<Todo> {
    return this.todosService.create(createTodoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Promise<Todo> {
    return this.todosService.delete(id);
  }

  @Patch(':id')
  editOne(
    @Body() editTodoDto: EditTodoDTO,
    @Param('id') id: number,
  ): Promise<Todo> {
    return this.todosService.editOne(id, editTodoDto);
  }
}
