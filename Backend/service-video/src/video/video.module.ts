import { Module } from '@nestjs/common';
import { VideoService } from './video.service';
import { VideoController } from './video.controller';
import { ResponseModule } from 'src/model/response.module';
import { ResponseService } from 'src/model/response';

@Module({
  controllers: [VideoController],
  providers: [VideoService,ResponseService],
})
export class VideoModule {}
