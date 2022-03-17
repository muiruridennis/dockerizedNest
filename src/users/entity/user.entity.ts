import * as bcrypt from 'bcrypt';
import { PrimaryGeneratedColumn, BaseEntity, Column, Entity, BeforeInsert, OneToMany } from 'typeorm';
import { MinLength } from "class-validator";
import Post from "../../posts/entity/posts.entity";
//import { Exclude } from 'class-transformer';


@Entity()
export class User  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true //unique flag. It indicates that there should not be two users with the same email
  })
  email: string;

  @OneToMany(() => Post, (post: Post) => post.creator)
  public posts: Post[];
  @Column()
  password: string;
  // @BeforeInsert()
  // async hashPassword() {
  //   this.password = await bcrypt.hash(this.password, 8);
    
  // }

}
