import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';
import { todoBuilder, createTodoDTOBuilder } from './fixture/todo.builder';
import { CreateTodoDTO } from './dto/create-todo.dto';

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
      const createTodoDTO: CreateTodoDTO = createTodoDTOBuilder();

      const repositorySaveMock = jest
        .spyOn(repository, 'save')
        .mockImplementationOnce(jest.fn());

      await todosService.create(createTodoDTO);
      expect(repositorySaveMock).toHaveBeenCalledTimes(1);
      expect(repositorySaveMock).toHaveBeenCalledWith(createTodoDTO);
    });
  });
});
