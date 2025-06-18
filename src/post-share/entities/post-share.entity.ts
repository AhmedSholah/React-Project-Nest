import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostShareDocument = HydratedDocument<PostShare>;

@Schema({ timestamps: true })
export class PostShare {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
    post: string;
}

export const PostShareSchema = SchemaFactory.createForClass(PostShare);
