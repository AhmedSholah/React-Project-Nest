import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createCommentDto: CreateCommentDto): Promise<import("../types/api-response").ApiResponse<null>>;
    findOne(id: string): string;
    update(id: string, updateCommentDto: UpdateCommentDto): string;
    remove(id: string): string;
}
