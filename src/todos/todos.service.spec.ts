import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
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

  describe('findAll Test', () => {
    it('should return array of todos', async () => {
      const result: Todo[] = [todoBuilder(), todoBuilder()];

      const repositoryFindMock = jest
        .spyOn(repository, 'find')
        .mockImplementationOnce(async () => result);

      expect(await todosService.findAll()).toBe(result);
      expect(repositoryFindMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne Test', () => {
    it('should return a todos', async () => {
      const todo: Todo = todoBuilder();

      const repositoryFindOneMock = jest
        .spyOn(repository, 'findOne')
        .mockImplementationOnce(async () => todo);

      expect(await todosService.findOne(todo.id)).toBe(todo);
      expect(repositoryFindOneMock).toHaveBeenCalledTimes(1);
      expect(repositoryFindOneMock).toHaveBeenCalledWith(todo.id);
    });
  });

  describe('create Test', () => {
    it('should create a todos', async () => {
      const todo: Todo = todoBuilder();

      const repositoryCreateMock = jest
        .spyOn(repository, 'create')
        .mockReturnValueOnce(todo);
      const repositorySaveMock = jest
        .spyOn(repository, 'save')
        .mockImplementationOnce(jest.fn());

      await todosService.create(
        todo.title,
        todo.sprintTotal,
        todo.sprintDone,
        todo.todoDone,
        todo.user.id,
      );
      expect(repositoryCreateMock).toHaveBeenCalledTimes(1);
      expect(repositorySaveMock).toHaveBeenCalledTimes(1);
      expect(repositoryCreateMock).toHaveBeenCalledWith({
        sprintDone: todo.sprintDone,
        sprintTotal: todo.sprintTotal,
        title: todo.title,
        todoDone: todo.todoDone,
        user: { id: todo.user.id },
      });
      expect(repositorySaveMock).toHaveBeenCalledWith(todo);
    });
  });
});
