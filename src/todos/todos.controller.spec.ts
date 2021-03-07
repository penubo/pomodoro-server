import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

describe('TodosController Test', () => {
  let todosController: TodosController;
  let todosService: TodosService;
  let repository: Repository<Todo>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'mysql',
          host: 'localhost',
          port: 3306,
          username: 'root',
          password: process.env.DB_PASSWORD,
          database: 'pomodoro_test',
          entities: ['src/**/*.entity{.ts,.js}'],
          synchronize: false,
          keepConnectionAlive: true,
        }),
        TypeOrmModule.forFeature([Todo]),
      ],
      controllers: [TodosController],
      providers: [TodosService],
    }).compile();
    repository = moduleRef.get('TodoRepository');

    todosService = moduleRef.get<TodosService>(TodosService);
    todosController = moduleRef.get<TodosController>(TodosController);
  });

  afterEach(async () => {
    await repository.query(`DELETE from todo;`);
  });

  afterAll(async () => {
    await repository.manager.connection.close();
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
      const todo = await todosController.create({
        title: 'hello world',
        sprintDone: 3,
        sprintTotal: 5,
        todoDone: false,
      });
      const editedTodo = await todosController.editOne({
        id: todo.id,
        title: 'see you later',
      });
      expect(editedTodo.title).toBe('see you later');
    });
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const newTodo = await todosController.create({
        title: 'hello world',
        sprintDone: 3,
        sprintTotal: 5,
        todoDone: false,
      });
      const todo = await repository.findOne(newTodo.id);
      expect(todo.title).toBe('hello world');
    });
  });
});
