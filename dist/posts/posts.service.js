"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const mongoose_1 = require("@nestjs/mongoose");
const post_entity_1 = require("./entities/post.entity");
const mongoose_2 = require("mongoose");
const uuid_1 = require("uuid");
let PostsService = class PostsService {
    configService;
    postModel;
    s3Client;
    constructor(configService, postModel) {
        this.configService = configService;
        this.postModel = postModel;
    }
    onModuleInit() {
        const region = this.configService.getOrThrow('AWS_S3_REGION');
        const endpoint = this.configService.getOrThrow('AWS_S3_ENDPOINT');
        const accessKeyId = this.configService.getOrThrow('AWS_S3_ACCESS_KEY_ID');
        const secretAccessKey = this.configService.getOrThrow('AWS_S3_SECRET_ACCESS_KEY');
        this.s3Client = new client_s3_1.S3Client({
            region,
            endpoint,
            credentials: {
                accessKeyId,
                secretAccessKey,
            },
            forcePathStyle: true,
        });
    }
    async create(request, createPostDto, files) {
        const { userId } = request.user;
        let uploadedMedia = [];
        let newPost;
        try {
            newPost = new this.postModel({
                title: createPostDto.title,
                description: createPostDto.description,
                author: userId,
                media: [],
            });
            for (const file of files) {
                const uuid = (0, uuid_1.v4)();
                const fileType = file.mimetype.split('/')[0];
                const fileExtention = file.mimetype.split('/')[1];
                const name = `posts/${newPost._id}/${uuid}.${fileExtention}`;
                const params = {
                    Bucket: 'react-project',
                    Key: name,
                    Body: file.buffer,
                    ContentType: file.mimetype,
                };
                const command = new client_s3_1.PutObjectCommand(params);
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
        }
        catch (err) {
            console.error('Create Post Error:', err);
            throw new common_1.HttpException('Something went wrong', common_1.HttpStatus.BAD_REQUEST);
        }
        return {
            success: true,
            message: 'Post created successfully',
            data: newPost,
        };
    }
    async findAll() {
        const posts = await this.postModel.find().populate('author').sort({
            createdAt: 'desc',
        });
        return {
            success: true,
            message: 'Posts fetched successfully',
            data: posts,
        };
    }
    async findOne(id) {
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return {
            success: true,
            message: 'Post fetched successfully',
            data: post,
        };
    }
    async update(req, id, updatePostDto, file) {
        const { userId } = req.user;
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        if (post.author.toString() !== userId) {
            throw new common_1.UnauthorizedException('You are not authorized to update this post');
        }
        const newPost = await this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true });
        await post.save();
        return {
            success: true,
            message: 'Post updated successfully',
            data: newPost,
        };
    }
    async remove(request, id) {
        const { userId } = request.user;
        const post = await this.postModel.findById(id);
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        if (post.author.toString() !== userId) {
            throw new common_1.UnauthorizedException('You are not authorized to delete this post');
        }
        await this.postModel.findByIdAndDelete(id);
        return {
            success: true,
            message: 'Post deleted successfully',
            data: null,
        };
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, mongoose_1.InjectModel)(post_entity_1.Post.name)),
    __metadata("design:paramtypes", [config_1.ConfigService,
        mongoose_2.Model])
], PostsService);
//# sourceMappingURL=posts.service.js.map