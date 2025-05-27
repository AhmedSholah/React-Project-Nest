import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
    OnModuleInit,
    UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
    DeleteObjectCommand,
    PutObjectCommand,
    S3Client,
} from '@aws-sdk/client-s3';
import { CreatePostDto, MediaItemDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from './entities/post.entity';
import mongoose, { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { ApiResponse } from 'src/types/api-response';

@Injectable()
export class PostsService implements OnModuleInit {
    private s3Client: S3Client;

    constructor(
        private configService: ConfigService,
        @InjectModel(Post.name) private postModel: Model<PostDocument>,
    ) {}

    onModuleInit() {
        const region = this.configService.getOrThrow<string>('AWS_S3_REGION');
        const endpoint =
            this.configService.getOrThrow<string>('AWS_S3_ENDPOINT');
        const accessKeyId = this.configService.getOrThrow<string>(
            'AWS_S3_ACCESS_KEY_ID',
        );
        const secretAccessKey = this.configService.getOrThrow<string>(
            'AWS_S3_SECRET_ACCESS_KEY',
        );

        this.s3Client = new S3Client({
            region,
            endpoint,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
            forcePathStyle: true,
        });
    }

    async create(request, createPostDto: CreatePostDto, files) {
        const { userId } = request.user;
        let uploadedMedia: MediaItemDto[] = [];
        let newPost;
        try {
            newPost = new this.postModel({
                title: createPostDto.title,
                description: createPostDto.description,
                author: userId,
                media: [],
            });

            for (const file of files) {
                const uuid = uuidv4();
                const fileType = file.mimetype.split('/')[0];
                const fileExtention = file.mimetype.split('/')[1];
                const name = `posts/${newPost._id}/${uuid}.${fileExtention}`;

                const params = {
                    Bucket: 'react-project',
                    Key: name,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                };
                const command = new PutObjectCommand(params);
                await this.s3Client.send(command);
                const mediaItem = {
                    name,
                    url: `${process.env.AWS_S3_PUBLIC_BUCKET_URL}/${name}`,
                    type: fileType,
                };
                uploadedMedia.push(mediaItem);
                newPost.media.push(mediaItem);
            }
            await newPost.save();
        } catch (err) {
            console.error('Create Post Error:', err);
            throw new HttpException(
                'Something went wrong',
                HttpStatus.BAD_REQUEST,
            );
        }

        return {
            success: true,
            message: 'Post created successfully',
            data: newPost,
        };
    }

    // findAll() {
    //     return `This action returns all posts`;
    // }

    // findOne(id: number) {
    //     return `This action returns a #${id} post`;
    // }

    async update(
        req,
        id: mongoose.Types.ObjectId,
        updatePostDto: UpdatePostDto,
    ): Promise<ApiResponse<any>> {
        const { userId } = req.user;

        const post = await this.postModel.findById(id);

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        if (post.author.toString() !== userId) {
            throw new UnauthorizedException(
                'You are not authorized to update this post',
            );
        }

        console.log('updatePostDto', updatePostDto);

        const newPost = await this.postModel.findByIdAndUpdate(
            id,
            updatePostDto,
            { new: true },
        );

        await post.save();

        return {
            success: true,
            message: 'Post updated successfully',
            data: newPost,
        };
    }

    async remove(
        request,
        id: mongoose.Types.ObjectId,
    ): Promise<ApiResponse<null>> {
        const { userId } = request.user;

        const post = await this.postModel.findById(id);

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        if (post.author.toString() !== userId) {
            throw new UnauthorizedException(
                'You are not authorized to delete this post',
            );
        }

        await this.postModel.findByIdAndDelete(id);

        return {
            success: true,
            message: 'Post deleted successfully',
            data: null,
        };
    }
}
