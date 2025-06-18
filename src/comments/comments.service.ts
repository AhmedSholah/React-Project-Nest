import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Comment, CommentDocument } from './entities/comment.entity';
import mongoose, { Model } from 'mongoose';
import { ApiResponse } from 'src/types/api-response';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    ) {}

    async create(
        createCommentDto: CreateCommentDto,
    ): Promise<ApiResponse<null>> {
        const comment = new this.commentModel(createCommentDto);
        await comment.save();

        return {
            success: true,
            message: 'Comment created successfully',
            data: null,
        };
    }
    async findAll(postId: mongoose.Types.ObjectId): Promise<ApiResponse<any>> {
        const comments = await this.commentModel
            .find({ post: postId })
            .populate('author')
            .sort({ createdAt: 'desc' });

        const count = await this.commentModel.countDocuments({ post: postId });

        return {
            success: true,
            message: 'Comments fetched successfully',
            data: {
                comments,
                count,
            },
        };
    }

    findOne(id: number) {
        return `This action returns a #${id} comment`;
    }

    update(id: number, updateCommentDto: UpdateCommentDto) {
        return `This action updates a #${id} comment`;
    }

    remove(id: number) {
        return `This action removes a #${id} comment`;
    }
}
