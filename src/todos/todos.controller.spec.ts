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
import { TodosController } from './todos.controller';

class TodosServiceMock {
  async findAll() {
    return [];
  }

  async create() {
    return {};
  }

  async delete() {
    return {};
  }

  async editOne() {
    return {};
  }
}

describe('TodosController Test', () => {
  let todosService: TodosService;
  let todosController: TodosController;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: new TodosServiceMock(),
        },
      ],
    }).compile();

    todosService = moduleRef.get<TodosService>(TodosService);
    todosController = moduleRef.get<TodosController>(TodosController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(todosController).toBeDefined();
  });

  describe('findAll Test', () => {
    it('should return todo list', async () => {
      const todo1 = todoBuilder();
      const todo2 = todoBuilder();

      const serviceFindAllMock = jest
        .spyOn(todosService, 'findAll')
        .mockImplementationOnce(async () => [todo1, todo2]);

      expect(await todosController.findAll()).toEqual([todo1, todo2]);
      expect(serviceFindAllMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('create Test', () => {
    it('should create Todo', async () => {
      const todo = todoBuilder();
      const todoDto = createTodoDTOBuilder();
      const serviceCreateMock = jest
        .spyOn(todosService, 'create')
        .mockImplementationOnce(async () => todo);

      expect(await todosController.create(todoDto)).toEqual(todo);
      expect(serviceCreateMock).toHaveBeenCalledTimes(1);
      expect(serviceCreateMock).toHaveBeenCalledWith(todoDto);
    });
  });

  describe('delete Test', () => {
    it('should delete Todo', async () => {
      const todo = todoBuilder();
      const serviceDeleteMock = jest
        .spyOn(todosService, 'delete')
        .mockImplementationOnce(async () => todo);

      expect(await todosController.delete(todo.id)).toEqual(todo);
      expect(serviceDeleteMock).toHaveBeenCalledTimes(1);
      expect(serviceDeleteMock).toHaveBeenCalledWith(todo.id);
    });
  });

  describe('editOne Test', () => {
    it('should edit Todo', async () => {
      const todo = todoBuilder();
      const editDto = editTodoDtoBuilder();
      const serviceEditOneMock = jest
        .spyOn(todosService, 'editOne')
        .mockImplementationOnce(async () => todo);

      expect(await todosController.editOne(editDto, todo.id)).toEqual(todo);
      expect(serviceEditOneMock).toHaveBeenCalledTimes(1);
      expect(serviceEditOneMock).toHaveBeenCalledWith(todo.id, editDto);
    });
  });
});
