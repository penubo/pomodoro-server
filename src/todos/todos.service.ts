import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDTO } from './dto/create-todo.dto';
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

  async editOne(patchTodo: Partial<Todo>): Promise<Todo> {
    if (patchTodo.id === undefined) throw new Error('id should be given');
    await this.todosRepository.update(patchTodo.id, patchTodo);
    return this.findOne(patchTodo.id);
  }

  async remove(id: string): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
