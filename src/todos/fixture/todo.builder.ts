import { Todo } from '../todo.entity';
import { build, fake, sequence } from '@jackfranklin/test-data-bot';
import { CreateTodoDTO } from '../dto/create-todo.dto';
import { EditTodoDTO } from '../dto/edit-todo.dto';

const todoBuilder = build<Todo>('Todo', {
  fields: {
    id: sequence(),
    title: fake((f) => f.name.title()),
    sprintTotal: fake((f) => f.random.number()),
    sprintDone: fake((f) => f.random.number()),
    todoDone: fake((f) => f.random.boolean()),
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
