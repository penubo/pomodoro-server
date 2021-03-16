import { Todo } from '../todos/todo.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  providerId: string;

  @Column({ nullable: true })
  provider: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];
}
