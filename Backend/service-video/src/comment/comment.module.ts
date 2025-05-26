import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { ResponseModule } from 'src/model/response.module';

@Module({
  imports:[ResponseModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
