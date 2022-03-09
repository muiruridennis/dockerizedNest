import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
 
@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id?: number;
 
  @Column({ unique: true })
  public title: string;
 
  @Column()
  public creator: string;
 
  @Column()
  public selectedFile: string;

  @Column({
      default: new Date()
  })
  createdAt: Date
}
 
export default Post;