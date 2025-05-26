import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ timestamps: true })
export class Comment {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    author: mongoose.Schema.Types.ObjectId;

    @Prop({ type: String, required: true })
    content: string;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
    // parent: mongoose.Schema.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Post' })
    post: mongoose.Schema.Types.ObjectId;

    // @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
    // replyTo: mongoose.Schema.Types.ObjectId;

    // @Prop({ type: Number, default: 0 })
    // likes: number;

    // @Prop({ type: Number, default: 0 })
    // dislikes: number;

    // @Prop({ type: Number, default: 0 })
    // views: number;

    // @Prop({ type: Number, default: 0 })
    // reports: number;

    // @Prop({ type: Boolean, default: false })
    // isDeleted: boolean;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
