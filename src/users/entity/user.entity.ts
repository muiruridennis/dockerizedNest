import * as bcrypt from 'bcrypt';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, BeforeInsert }  from 'typeorm';


@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ 
    type: 'varchar', 
    nullable: false 
})
  name: string;

  @Column({ 
    type: 'varchar', 
    nullable: false 
})
  email: string;

  @Column()
  password: string;
  @BeforeInsert()  async hashPassword() {
      this.password = await bcrypt.hash(this.password, 10);  
  }
}
