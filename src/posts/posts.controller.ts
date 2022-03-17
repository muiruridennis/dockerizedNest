import { Controller, Post, Body, Request, UseGuards, Get, Param,} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/createPostDto';
import { JwtAuthGuard } from "../auth/jwt-auth.guard";



@Controller('posts')
export class PostsController {
    constructor(private PostService: PostsService) { };

    @Get('allposts')
    async getAllPosts() {
        const posts = await this.PostService.getAllPosts();
        return posts;
    }

    @Get(':id')
    getPostById(@Param('id') id: string) {
        return this.PostService.getPostById(Number(id));
    }

   
    @Post("create")
    @UseGuards(JwtAuthGuard)
    async createPost(@Body() post: CreatePostDTO, @Request() req: any) {
        const user = req.user
        return this.PostService.createPost(post, user); 
        // @Post() is a built -in Nest decorator, informing our controller how it should handle incoming POST requests.
        // @UseGuards(JwtAuthGuard) is a guard decorator responsible for checking if a user is authorized to make such a call.
        //If not, the guard will return an HTTP exception, containing a message that the user is unauthorized.
        // @Body() CreatePostDTO: CreatePostDTO is a body decorator which provides us with information 
        //about request body payload.
        // @Req() { user }: RequestWithUser – if a user is authorized to make a specific request, our implementation of JwtAuthGuard will provide us with information about the user in the upcoming request.
        //  Lastly, we return the method from our service responsible for creating a new post in the database.
    };

    @Post("/edit/:postId")
    async updatePost(@Param("postId") postId, @Body() post: CreatePostDTO) {
        const updatedPost = await this.PostService.updatePost(Number(postId), post);
        return updatedPost;
    }
}
