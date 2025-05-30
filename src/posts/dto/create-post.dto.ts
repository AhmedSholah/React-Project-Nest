import { Type } from 'class-transformer';
import {
    IsArray,
    IsIn,
    IsMongoId,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    Length,
    ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

export class MediaItemDto {
    @IsString()
    name: string;

    @IsUrl()
    url: string;

    @IsString()
    @IsIn(['image', 'video'])
    type: 'image' | 'video';
}

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @Length(3, 50)
    title: string;

    @IsNotEmpty()
    @IsString()
    @Length(3, 1000)
    description: string;

    @IsNotEmpty()
    @IsMongoId()
    @IsOptional()
    author: mongoose.Types.ObjectId;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => MediaItemDto)
    media: MediaItemDto[];
}
