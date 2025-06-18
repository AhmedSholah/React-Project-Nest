import { Controller, Param, Post, Req } from '@nestjs/common';
import { PostShareService } from './post-share.service';
import { ParseObjectIdPipe } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Controller()
export class PostShareController {
    constructor(private readonly postShareService: PostShareService) {}

    @Post('posts/:postId/share')
    create(
        @Param('postId', ParseObjectIdPipe) postId: mongoose.Types.ObjectId,
        @Req() req: any,
    ) {
        const { userId } = req.user;
        return this.postShareService.create(postId, userId);
    }
}
