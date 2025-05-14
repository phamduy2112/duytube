import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MediaService } from './media.service';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';

// schema.prisma
// model Media {
//   id          Int      @id @default(autoincrement())
//   playbackId  String   // playback_id từ Mux
//   assetId     String   // asset_id từ Mux
//   videoUrl    String   // playback URL
//   createdAt   DateTime @default(now())
// }
@Controller('media')
export class MediaController {
  // constructor(private readonly mediaService: MediaService) {}
  // create(createMediaDto){
  //   this.mediaService.createAndSaveVideo(createMediaDto)
  // }
  // delete(id:string){
  //   this.mediaService.deleteVideo(id)
  // }
}
