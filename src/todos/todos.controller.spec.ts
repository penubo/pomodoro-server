import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
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
          synchronize: true,
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

  afterAll(async () => {
    await repository.manager.connection.close();
  });

  afterEach(async () => {
    await repository.query(`DELETE from todo;`);
  });

  describe.only('findAll', () => {
    it('should return array of todos', async () => {
      const user = new User();
      const result: Todo[] = [
        {
          id: 1,
          title: 'title',
          sprintTotal: 2,
          sprintDone: 1,
          todoDone: false,
          user: user,
        },
      ];

      jest
        .spyOn(todosService, 'findAll')
        .mockImplementationOnce(async () => result);

      expect(await todosController.findAll({})).toBe(result);
    });
  });

  describe('patch', () => {
    it('should edit one of the todos', async () => {
      const userData = new User();
      userData.firstName = 'yongjoon';
      userData.lastName = 'kim';
      userData.email = 'yongjoon@gmail.com';
      const user = await repository.manager.save(userData);
      const todo = await todosController.create({
        title: 'hello world',
        sprintDone: 3,
        sprintTotal: 5,
        todoDone: false,
        userId: user.id,
      });
      const editedTodo = await todosController.editOne(
        {
          title: 'see you later',
          sprintDone: 3,
          sprintTotal: 5,
          todoDone: false,
        },
        todo.id,
      );
      expect(editedTodo.title).toBe('see you later');
    });
  });

  describe('create', () => {
    it('should create a todo', async () => {
      const userData = new User();
      userData.firstName = 'yongjoon';
      userData.lastName = 'kim';
      userData.email = 'yongjoon@gmail.com';
      const user = await repository.manager.save(userData);
      const newTodo = await todosController.create({
        title: 'hello world',
        sprintDone: 3,
        sprintTotal: 5,
        todoDone: false,
        userId: user.id,
      });
      const todo = await repository.findOne(newTodo.id);
      expect(todo.title).toBe('hello world');
    });
  });

  describe('delete', () => {
    it('should delete a todo', async () => {
      const userData = new User();
      userData.firstName = 'yongjoon';
      userData.lastName = 'kim';
      userData.email = 'yongjoon@gmail.com';
      const user = await repository.manager.save(userData);
      const todo = await todosController.create({
        title: 'hello world',
        sprintDone: 3,
        sprintTotal: 5,
        todoDone: false,
        userId: user.id,
      });
      const deletedTodo = await todosController.delete(todo.id);
      expect(await repository.findOne(todo.id)).toBeUndefined();
      expect(deletedTodo.id).toBe(todo.id);
    });
  });
});
