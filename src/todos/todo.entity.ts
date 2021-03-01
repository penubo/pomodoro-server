import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  sprintTotal: number;

  @Column()
  sprintDone: number;

  @Column()
  todoDone: boolean;
}
