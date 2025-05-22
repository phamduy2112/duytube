import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CategoryModule } from './category/category.module';
import { ResponseModule } from './model/response.module';
import { VideoModule } from './video/video.module';
import { MediaModule } from './media/media.module';
import { CommentModule } from './comment/comment.module';
import { ReactionsModule } from './reactions/reactions.module';
import { WebhookModule } from './webhook/webhook.module';
import { SubscripeModule } from './subscripe/subscripe.module';
import { PlaylistsModule } from './playlists/playlists.module';

@Module({
  imports: [PrismaModule, ResponseModule,CategoryModule, VideoModule, MediaModule, CommentModule, ReactionsModule, WebhookModule, SubscripeModule, PlaylistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
