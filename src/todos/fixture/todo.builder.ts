import { User } from '../../users/user.entity';
import { Todo } from '../todo.entity';
import { build, fake, sequence } from '@jackfranklin/test-data-bot';
import { CreateTodoDTO } from '../dto/create-todo.dto';
import { EditTodoDTO } from '../dto/edit-todo.dto';

const userBuilder = build<User>('User', {
  fields: {
    id: sequence(),
    firstName: fake((f) => f.name.findName()),
    lastName: fake((f) => f.name.findName()),
    email: fake((f) => f.internet.email()),
    photo: fake((f) => f.image.imageUrl()),
    providerId: fake((f) => f.random.uuid()),
    provider: fake((f) => f.name.jobType()),
    todos: null,
  },
});

const todoBuilder = build<Todo>('Todo', {
  fields: {
    id: sequence(),
    title: fake((f) => f.name.title()),
    sprintTotal: fake((f) => f.random.number()),
    sprintDone: fake((f) => f.random.number()),
    todoDone: fake((f) => f.random.boolean()),
    user: fake(() => userBuilder()),
  },
});

const createTodoDTOBuilder = build<CreateTodoDTO>('CreateTodoDTO', {
  fields: {
    title: fake((f) => f.name.title()),
    sprintTotal: fake((f) => f.random.number()),
    sprintDone: fake((f) => f.random.number()),
    todoDone: fake((f) => f.random.boolean()),
  },
});

const editTodoDtoBuilder = build<EditTodoDTO>('EditTodoDTO', {
  fields: {
    title: fake((f) => f.name.title()),
    sprintTotal: fake((f) => f.random.number()),
    sprintDone: fake((f) => f.random.number()),
    todoDone: fake((f) => f.random.boolean()),
  },
});

export { todoBuilder, createTodoDTOBuilder, editTodoDtoBuilder };
