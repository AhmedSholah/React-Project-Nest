import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ timestamps: true })
export class Post {
    @Prop({ type: String, required: true })
    title: string;

    @Prop({ type: String, required: true })
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    author: mongoose.Types.ObjectId;

    @Prop({ type: String })
    image: string;

    @Prop({ type: String })
    video: string;

    @Prop({ type: Array, default: [] })
    media: {
        name: string;
        url: string;
        type: string;
    }[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
