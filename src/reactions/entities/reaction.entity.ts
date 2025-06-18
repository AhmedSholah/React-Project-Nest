import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type ReactionDocument = HydratedDocument<Reaction>;

@Schema()
export class Reaction {
    @Prop({ type: String, required: true })
    type: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Post' })
    post: mongoose.Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
    user: mongoose.Types.ObjectId;
}

export const ReactionSchema = SchemaFactory.createForClass(Reaction);
