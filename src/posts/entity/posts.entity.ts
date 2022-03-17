import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from "../../users/entity/user.entity"
@Entity()
class Post {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  public selectedFile: string;

  @Column({
    default: new Date(),
    nullable: true
  })
  createdAt: Date

  @ManyToOne(() => User, (creator: User) => creator.posts)
  public creator: User;

}
export default Post