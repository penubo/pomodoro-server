import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController Test', () => {
  let todosController: TodosController;
  let todosService: TodosService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        TodosService,
        {
          provide: getRepositoryToken(Todo),
          useValue: {},
        },
      ],
    }).compile();

    todosService = moduleRef.get<TodosService>(TodosService);
    todosController = moduleRef.get<TodosController>(TodosController);
  });

  describe('findAll', () => {
    it('should return array of todos', async () => {
      const result: Todo[] = [
        {
          id: 1,
          title: 'title',
          sprintTotal: 2,
          sprintDone: 1,
          todoDone: false,
        },
      ];

      jest
        .spyOn(todosService, 'findAll')
        .mockImplementationOnce(async () => result);

      expect(await todosController.findAll()).toBe(result);
    });
  });

  describe('patch', () => {
    it('should edit one of the todos', async () => {
      const result: Todo = {
        id: 1,
        title: 'title',
        sprintTotal: 2,
        sprintDone: 1,
        todoDone: false,
      };

      jest
        .spyOn(todosService, 'editOne')
        .mockImplementationOnce(async () => result);
      expect(
        await todosController.editOne({ id: 1, title: 'hello world' }),
      ).toBe(result);
    });
  });
});
