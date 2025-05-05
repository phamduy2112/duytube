import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
// model Comment {
//   id          Int        @id @default(autoincrement())
//   content     String
//   createdAt   DateTime   @default(now())

//   // Quan hệ với user và video
//   user        User       @relation(fields: [userId], references: [id])
//   userId      Int
//   video       Video      @relation(fields: [videoId], references: [id])
//   videoId     Int

//   // Gộp chung comment & reply
//   parentId    Int?       
//   parent      Comment?   @relation("CommentReplies", fields: [parentId], references: [id])
//   replies     Comment[]  @relation("CommentReplies")
// }

@Module({
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
