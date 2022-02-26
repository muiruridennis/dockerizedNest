import { PrimaryGeneratedColumn, BaseEntity, Column, Entity }  from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  age: string;

  @Column()
  sex: string;
}