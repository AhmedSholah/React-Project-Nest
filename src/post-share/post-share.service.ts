import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { PostShare, PostShareDocument } from './entities/post-share.entity';
import { ApiResponse } from 'src/types/api-response';

@Injectable()
export class PostShareService {
    constructor(
        @InjectModel(PostShare.name)
        private postShare: Model<PostShareDocument>,
    ) {}

    async create(
        postId: Types.ObjectId,
        userId: Types.ObjectId,
    ): Promise<ApiResponse<any>> {
        const postShare = await this.postShare.create({
            user: userId,
            post: postId,
        });

        return {
            success: true,
            message: 'Post shared successfully',
            data: postShare,
        };
    }
}
