import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CommentsModule } from './comments/comments.module';
import { PostsModule } from './posts/posts.module';
import { ReactionsModule } from './reactions/reactions.module';
import { PostShareModule } from './post-share/post-share.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        MongooseModule.forRoot(process.env.DB_CONNECTION_STRING!),
        UsersModule,
        CommentsModule,
        PostsModule,
        AuthModule,
        ReactionsModule,
        PostShareModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
