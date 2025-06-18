import { IsMongoId, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCommentDto {
    @IsNotEmpty()
    @IsMongoId()
    author: string;

    @IsNotEmpty()
    @IsMongoId()
    post: string;

    @IsString()
    @Length(1, 1000)
    content: string;
}
