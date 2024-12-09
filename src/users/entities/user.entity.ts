import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users') // Garante o nome da tabela como "users"
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
