import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentDocument } from './entities/comment.entity';
import mongoose, { Model } from 'mongoose';
import { ApiResponse } from 'src/types/api-response';
export declare class CommentsService {
    private commentModel;
    constructor(commentModel: Model<CommentDocument>);
    create(createCommentDto: CreateCommentDto): Promise<ApiResponse<null>>;
    findAll(postId: mongoose.Types.ObjectId): Promise<ApiResponse<any>>;
    findOne(id: number): string;
    update(id: number, updateCommentDto: UpdateCommentDto): string;
    remove(id: number): string;
}
