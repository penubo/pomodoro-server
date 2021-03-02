import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  findOne(id: string): Promise<Todo> {
    return this.todosRepository.findOne(id);
  }

  async create(
    title: string,
    sprintTotal: number,
    sprintDone: number,
    todoDone: boolean,
  ): Promise<Todo> {
    const newTodo = this.todosRepository.create({
      title,
      sprintTotal,
      sprintDone,
      todoDone,
    });
    return await this.todosRepository.save(newTodo);
  }

  async remove(id: string): Promise<void> {
    await this.todosRepository.delete(id);
  }
}
