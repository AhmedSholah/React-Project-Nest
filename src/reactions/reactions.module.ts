import { Module } from '@nestjs/common';
import { ReactionsService } from './reactions.service';
import { ReactionsController } from './reactions.controller';
import { Reaction, ReactionSchema } from './entities/reaction.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Reaction.name, schema: ReactionSchema },
        ]),
    ],
    controllers: [ReactionsController],
    providers: [ReactionsService],
    exports: [ReactionsService],
})
export class ReactionsModule {}
