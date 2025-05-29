import mongoose from 'mongoose';
export declare class MediaItemDto {
    name: string;
    url: string;
    type: 'image' | 'video';
}
export declare class CreatePostDto {
    title: string;
    description: string;
    author: mongoose.Types.ObjectId;
    media: MediaItemDto[];
}
