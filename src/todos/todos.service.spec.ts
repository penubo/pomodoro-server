import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { TodosService } from './todos.service';
import {
  todoBuilder,
  createTodoDTOBuilder,
  editTodoDtoBuilder,
} from './fixture/todo.builder';
import { CreateTodoDTO } from './dto/create-todo.dto';
import { EditTodoDTO } from './dto/edit-todo.dto';

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

  beforeEach(() => {
    jest.clearAllMocks();
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

  describe('editOne Test', () => {
    it('should edit a todo', async () => {
      const todo: Todo = todoBuilder();
      const editTodoDto: EditTodoDTO = editTodoDtoBuilder();
      const updatedTodo: Todo = { ...todo, ...editTodoDto };

      const repositoryUpdateMock = jest
        .spyOn(repository, 'update')
        .mockImplementationOnce(jest.fn());
      const repositoryFindOneMock = jest
        .spyOn(repository, 'findOneOrFail')
        .mockImplementationOnce(async () => updatedTodo);

      expect(await todosService.editOne(todo.id, editTodoDto)).toBe(
        updatedTodo,
      );
      expect(repositoryUpdateMock).toHaveBeenCalledTimes(1);
      expect(repositoryUpdateMock).toHaveBeenCalledWith(
        { id: todo.id },
        editTodoDto,
      );
      expect(repositoryFindOneMock).toHaveBeenCalledTimes(1);
      expect(repositoryFindOneMock).toHaveBeenCalledWith(todo.id);
    });
  });

  describe('delete Test', () => {
    it('should delete a todo', async () => {
      const todo: Todo = todoBuilder();

      const repositoryFindOneMock = jest
        .spyOn(repository, 'findOne')
        .mockImplementationOnce(async () => todo);

      const repositoryDeleteMock = jest
        .spyOn(repository, 'delete')
        .mockImplementationOnce(jest.fn());

      expect(await todosService.delete(todo.id)).toBe(todo);
      expect(repositoryFindOneMock).toHaveBeenCalledTimes(1);
      expect(repositoryFindOneMock).toHaveBeenCalledWith(todo.id);
      expect(repositoryDeleteMock).toHaveBeenCalledTimes(1);
      expect(repositoryDeleteMock).toHaveBeenCalledWith(todo.id);
    });
  });
});
