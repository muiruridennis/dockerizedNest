import {Repository, EntityRepository} from "typeorm";
import Post from "./entity/posts.entity";

@EntityRepository(Post)
export class PostsRepository extends Repository <Post>{}