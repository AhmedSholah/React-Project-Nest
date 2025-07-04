import { Type } from 'class-transformer';
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFiles,
    ParseIntPipe,
    Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Request } from 'express';
import { ApiResponse } from 'src/types/api-response';
import { PublicEndpoint } from 'src/auth/PublicEndpoint';
import { ReactionsService } from 'src/reactions/reactions.service';
import { CreateReactionDto } from 'src/reactions/dto/create-reaction.dto';

@Controller('posts')
export class PostsController {
    constructor(
        private readonly postsService: PostsService,
        private readonly reactionsService: ReactionsService,
    ) {}

    @Post()
    @UseInterceptors(FilesInterceptor('media'))
    create(
        @Body() createPostDto: CreatePostDto,
        @Req() request: Request,
        @UploadedFiles() media: Array<Express.Multer.File>,
    ) {
        return this.postsService.create(request, createPostDto, media);
    }

    @PublicEndpoint()
    @Get()
    async findAll() {
        return this.postsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseObjectIdPipe) id: mongoose.Types.ObjectId) {
        return this.postsService.findOne(id);
    }

    @Patch(':id')
    @UseInterceptors(FilesInterceptor('media'))
    async update(
        @Param('id', ParseObjectIdPipe) id: mongoose.Types.ObjectId,
        @Body() updatePostDto: UpdatePostDto,
        @Req() req: Request,
        @UploadedFiles() media: Array<Express.Multer.File>,
    ) {
        return this.postsService.update(req, id, updatePostDto, media);
    }

    @Delete(':id')
    async remove(
        @Param('id', ParseObjectIdPipe) id: mongoose.Types.ObjectId,
        @Req() req: Request,
    ): Promise<ApiResponse<null>> {
        return await this.postsService.remove(req, id);
    }

    @Get(':id/comments')
    async findAllComments(
        @Param('id', ParseObjectIdPipe) id: mongoose.Types.ObjectId,
    ) {
        return await this.postsService.findAllComments(id);
    }
}
