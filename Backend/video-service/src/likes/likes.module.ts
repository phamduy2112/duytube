import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
// model Like {
//   id        Int     @id @default(autoincrement())
//   user      User    @relation(fields: [userId], references: [id])
//   userId    Int
// type      String   // "like" hoặc "unlike"

//   media     Media   @relation(fields: [mediaId], references: [id])
//   mediaId   Int
//   createdAt DateTime @default(now())

//   @@unique([userId, mediaId]) // 1 user chỉ like 1 media 1 lần
// }
@Module({
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
