import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import mongoose from 'mongoose';
import { Request } from 'express';
import { ApiResponse } from 'src/types/api-response';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, request: Request, media: Array<Express.Multer.File>): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    update(id: mongoose.Types.ObjectId, updatePostDto: UpdatePostDto, req: Request): Promise<UpdatePostDto>;
    remove(id: mongoose.Types.ObjectId, req: Request): Promise<ApiResponse<null>>;
}
