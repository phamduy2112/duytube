import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Mux } from '@mux/mux-node';

@Injectable()
export class MediaService {
  private uploads: Mux.Video.Uploads;
  private assets: Mux.Video.Assets;

  constructor(private prisma: PrismaService) {
    // Khởi tạo Mux SDK với token
    const muxClient = new Mux({
      tokenId: process.env.MUX_TOKEN_ID,
      tokenSecret: process.env.MUX_TOKEN_SECRET,
    });

    // Lấy các đối tượng cần thiết từ Mux SDK
    this.uploads = muxClient.video.uploads;  // Uploads
    this.assets = muxClient.video.assets;    // Assets
  }

  // Tạo Direct Upload URL và lưu video vào cơ sở dữ liệu
  async createAndSaveVideo(createMediaDto) {
    const upload = await this.uploads.create({
      new_asset_settings: {
        playback_policy: ['public'],
      },
      cors_origin: '*',
    });

    // Lưu thông tin video vào cơ sở dữ liệu
    const media = await this.prisma.media.create({
      data: {
        playbackId: upload.id,
        assetId: upload.asset_id,
        videoUrl: upload.url,
      
      },
    });

    return { uploadUrl: upload.url, id: upload.id, media };
  }

  // Xóa video từ Mux bằng asset_id
  async deleteVideo(assetId: string) {
    try {
      // Gọi API để xóa video từ Mux
      await this.assets.delete(assetId);  // Lỗi trước, đổi thành delete

      // Xóa thông tin video khỏi cơ sở dữ liệu
      await this.prisma.media.delete({
        where: { assetId },
      });

      return { message: 'Video deleted successfully' };
    } catch (error) {
      console.error('Error deleting video:', error);
      throw new Error('Failed to delete video');
    }
  }
}
