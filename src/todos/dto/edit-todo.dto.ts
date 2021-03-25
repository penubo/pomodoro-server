import { IsOptional } from 'class-validator';

export class EditTodoDTO {
  @IsOptional()
  title: string;

  @IsOptional()
  sprintTotal: number;

  @IsOptional()
  sprintDone: number;

  @IsOptional()
  todoDone: boolean;
}
