import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { EditTodoDTO } from './dto/edit-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>,
  ) {}

  findAll(): Promise<Todo[]> {
    return this.todosRepository.find();
  }

  findOne(id: number): Promise<Todo> {
    return this.todosRepository.findOne(id);
  }

  create(createTodoDto: CreateTodoDTO): Promise<Todo> {
    return this.todosRepository.save(createTodoDto);
  }

  async delete(id: number) {
    const todo = this.todosRepository.findOne(id);
    await this.todosRepository.delete(id);
    return todo;
  }

  async editOne(todoId: number, editTodoDto: EditTodoDTO): Promise<Todo> {
    await this.todosRepository.update({ id: todoId }, editTodoDto);
    return this.todosRepository.findOneOrFail(todoId);
  }
}
