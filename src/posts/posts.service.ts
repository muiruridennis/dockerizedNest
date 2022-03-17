import { Injectable, HttpException, HttpStatus} from '@nestjs/common';
import { PostsRepository } from "./post-repository";
import { InjectRepository } from '@nestjs/typeorm';
import {CreatePostDTO} from "./dto/createPostDto"
import { User } from '../users/entity/user.entity';


@Injectable()
export class PostsService {
    constructor(
    @InjectRepository(PostsRepository) 
    private PostsRepository: PostsRepository
    ) { }

    async getAllPosts () {
        return await this.PostsRepository.find({
            relations:["creator"]
        });
    };

    async getPostById(id: number) {
        const post = await this.PostsRepository.findOne(id, { relations: ['creator'] });
        if (post) {
          return post;
        }
        throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
      }

    async createPost (post: CreatePostDTO, user: User){
        const newPost = await this.PostsRepository.create({
           ...post,
            creator: user
        });
        await this.PostsRepository.save(newPost);
        return newPost;
        

    };

    async updatePost(id: number, post: CreatePostDTO) {
        await this.PostsRepository.update(id, post);
        const updatedPost = await this.PostsRepository.findOne(id, { relations: ['creator'] });
        if (updatedPost) {
          return updatedPost
        }
        throw new HttpException("Post not updated", HttpStatus.BAD_REQUEST);
      }
}
