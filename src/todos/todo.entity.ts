import { User } from '../users/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

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

  @ManyToOne(() => User, (user) => user.todos, { nullable: false })
  user!: User;
}
