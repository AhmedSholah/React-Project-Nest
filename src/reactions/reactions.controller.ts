import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ReactionsService } from './reactions.service';

import { ParseObjectIdPipe } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { CreateReactionDto } from './dto/create-reaction.dto';
import { PublicEndpoint } from 'src/auth/PublicEndpoint';

@Controller()
export class ReactionsController {
    constructor(private readonly reactionsService: ReactionsService) {}

    @Post('posts/:postId/reactions')
    async addReaction(
        @Param('postId', ParseObjectIdPipe) id: mongoose.Types.ObjectId,
        @Body() createReactionDto: CreateReactionDto,
        @Req() request: Request,
    ) {
        return await this.reactionsService.create(
            id,
            request,
            createReactionDto,
        );
    }

    @PublicEndpoint()
    @Get('posts/:postId/reactions')
    findAll(@Param('postId', ParseObjectIdPipe) id: mongoose.Types.ObjectId) {
        return this.reactionsService.findAll(id);
    }
}
