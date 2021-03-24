import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';
import { todoBuilder } from './fixture/todo.builder';

describe('TodosService Test', () => {
  let todosService: TodosService;
  let repository: Repository<Todo>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useClass: Repository,
        },
      ],
    }).compile();

    todosService = moduleRef.get<TodosService>(TodosService);
    repository = moduleRef.get<Repository<Todo>>(getRepositoryToken(Todo));
  });

  it('should be defined', () => {
    expect(todosService).toBeDefined();
  });

  describe('findAll', () => {
    it('should return array of todos', async () => {
      const result: Todo[] = [todoBuilder(), todoBuilder()];

      const repositoryFindMock = jest
        .spyOn(repository, 'find')
        .mockImplementationOnce(async () => result);

      expect(await todosService.findAll()).toBe(result);
      expect(repositoryFindMock).toHaveBeenCalledTimes(1);
    });
  });
});
