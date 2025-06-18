import { Module } from '@nestjs/common';
import { PostShareService } from './post-share.service';
import { PostShareController } from './post-share.controller';
import { PostShare, PostShareSchema } from './entities/post-share.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: PostShare.name, schema: PostShareSchema },
        ]),
    ],
    controllers: [PostShareController],
    providers: [PostShareService],
})
export class PostShareModule {}
