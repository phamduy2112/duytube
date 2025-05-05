import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideoModule } from './video/video.module';
import { CommentModule } from './comment/comment.module';
import { MediaModule } from './media/media.module';
import { LikesModule } from './likes/likes.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [VideoModule, CommentModule, MediaModule, LikesModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
