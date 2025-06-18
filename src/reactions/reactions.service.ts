import { Injectable } from '@nestjs/common';
import { CreateReactionDto } from './dto/create-reaction.dto';
import mongoose, { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Reaction, ReactionDocument } from './entities/reaction.entity';

@Injectable()
export class ReactionsService {
    constructor(
        @InjectModel(Reaction.name)
        private reactionModel: Model<ReactionDocument>,
    ) {}

    async create(
        postId: mongoose.Types.ObjectId,
        request,
        createReactionDto: CreateReactionDto,
    ) {
        const { userId } = request.user;
        const reaction = await this.reactionModel.findOne({
            post: postId,
            user: userId,
        });

        if (!reaction) {
            const newReaction = new this.reactionModel({
                post: postId,
                user: userId,
                type: createReactionDto.type,
            });
            await newReaction.save();

            return {
                success: true,
                message: 'Reaction created successfully',
                data: newReaction,
            };
        }
        reaction.type = createReactionDto.type;
        await reaction.save();

        return {
            success: true,
            message: 'Reaction updated successfully',
            data: reaction,
        };
    }

    async findAll(postId: Types.ObjectId) {
        const aggregated = await this.reactionModel.aggregate([
            { $match: { post: postId } },
            {
                $group: {
                    _id: '$type',
                    count: { $sum: 1 },
                },
            },
        ]);

        const result = aggregated.reduce(
            (acc, curr) => {
                acc[curr._id] = curr.count;
                return acc;
            },
            {} as Record<string, number>,
        );

        return {
            success: true,
            message: 'Reactions retrieved successfully',
            data: result,
        };
    }
}
