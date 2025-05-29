import { OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostDocument } from './entities/post.entity';
import mongoose, { Model } from 'mongoose';
import { ApiResponse } from 'src/types/api-response';
export declare class PostsService implements OnModuleInit {
    private configService;
    private postModel;
    private s3Client;
    constructor(configService: ConfigService, postModel: Model<PostDocument>);
    onModuleInit(): void;
    create(request: any, createPostDto: CreatePostDto, files: any): Promise<{
        success: boolean;
        message: string;
        data: any;
    }>;
    update(req: any, id: mongoose.Types.ObjectId, updatePostDto: UpdatePostDto): Promise<ApiResponse<any>>;
    remove(request: any, id: mongoose.Types.ObjectId): Promise<ApiResponse<null>>;
}
