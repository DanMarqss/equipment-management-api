import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Equipment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  dataCompra: Date;

  @Column()
  vidaUtil: Date;

  @Column()
  setor: string;

  @Column({ nullable: true })
  responsavel: string;
}