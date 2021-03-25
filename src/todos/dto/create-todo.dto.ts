import { IsNotEmpty } from 'class-validator';

export class CreateTodoDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  sprintTotal: number;

  @IsNotEmpty()
  sprintDone: number;

  @IsNotEmpty()
  todoDone: boolean;
}
