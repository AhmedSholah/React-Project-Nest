import { IsEnum, IsMongoId, IsNotEmpty } from 'class-validator';

export enum ReactionType {
    LOVE = 'love',
    LIKE = 'like',
    DISLIKE = 'dislike',
}

export class CreateReactionDto {
    @IsNotEmpty()
    @IsEnum(ReactionType)
    type: ReactionType;

    // @IsMongoId()
    // @IsNotEmpty()
    // post: string;

    // @IsMongoId()
    // @IsNotEmpty()
    // user: string;
}
