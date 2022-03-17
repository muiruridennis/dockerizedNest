import { IsString, IsDate } from 'class-validator';

export class CreatePostDTO {
    @IsString() title: string;
    @IsString() content: string;
    @IsString() selectedFile: string;
     createdAt: string;

}