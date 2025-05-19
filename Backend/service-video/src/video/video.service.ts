import Mux from '@mux/mux-node';
import { Injectable, NotFoundException } from '@nestjs/common';
import { ResponseService } from 'src/model/response';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VideoService {
  private readonly uploads;
  private readonly assets;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly response: ResponseService,
  ) {
    const muxClient = new Mux({
      tokenId: process.env.MUX_TOKEN_ID,
      tokenSecret: process.env.MUX_TOKEN_SECRET,
    });

    this.uploads = muxClient.video.uploads;
    this.assets = muxClient.video.assets;
  }

  // Tạo video và lấy upload_url từ Mux
  async create(data: { title: string; user_id: string; description?: string;category_id:string}) {
    const upload = await this.uploads.create({
      new_asset_settings: {
        playback_policy: 'public',
      },
    });

    const video = await this.prismaService.videos.create({
      data: {
        title: data.title,
        description: data.description,
        user_id: data.user_id,
        category_id:data.category_id,
        mux_status: 'waiting_upload',
        mux_upload_id: upload.id,
      },
    });

    return {
      video,
      upload_url: upload.url,
    };
  }

  // Tạo user
  async createUser(data: { clerk_user_id: string; channel_name: string; avatar_url?: string; bio?: string }) {
    const user = await this.prismaService.users.create({
      data: {
        clerk_user_id: data.clerk_user_id,
        channel_name: data.channel_name,
        avatar_url: data.avatar_url,
        bio: data.bio,
      },
    });

    return this.response.responseSend(user, 'User created successfully', 201);
  }

  // Lấy tất cả video
  async findAll() {
    const videos = await this.prismaService.videos.findMany({
      orderBy: { created_at: 'desc' },
      include:{
        users:{
          
        }
      }
    });


    return this.response.responseSend(videos, 'Videos fetched successfully', 200);
  }
  
  // 
  async findVideosTrending(){
    const viewCounts=await this.prismaService.video_views.groupBy({
      by:['video_id'],
      _count:{
        video_id:true,
      },
      orderBy:{
        _count:{
          video_id:"desc"
        },
      },
      take:10
    })
    const videos=await this.prismaService.videos.findMany({
      where:{
        id:{
          in:viewCounts.map((v)=>v.video_id)
        }
      }
    })
    return videos
  }
  
  // Lấy một video theo id
  async findOne(id: string, userId?: string) {
    const video = await this.prismaService.videos.findFirst({ where: { id },
    include:{
      users:{},
      video_views:{},
    } }

 
    );
  
    if (!video) {
      throw new NotFoundException('Video not found');
    }
  
    // Kiểm tra userId có tồn tại thì mới gọi addView
    if (userId) {
      await this.addView(userId, video.id);
    }
  
    return this.response.responseSend(video, 'Video fetched successfully', 200);
  }
  
  // Lấy video theo category
  async findByCategories(category_id: string) {
    const videos = await this.prismaService.videos.findMany({
      where: {
        category_id: category_id, // Đảm bảo bạn đã có `category_id` trong model
      },
    });

    return this.response.responseSend(videos, 'Videos by category fetched', 200);
  }

  // Cập nhật video
  async update(id: string, updateVideoDto: { title?: string; description?: string }) {
    const video = await this.prismaService.videos.findUnique({ where: { id } });

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    const updated = await this.prismaService.videos.update({
      where: { id },
      data: updateVideoDto,
    });

    return this.response.responseSend(updated, 'Video updated successfully', 200);
  }

  // Xoá video
  async remove(id: string) {
    const video = await this.prismaService.videos.findUnique({ where: { id } });

    if (!video) {
      throw new NotFoundException('Video not found');
    }

    await this.prismaService.videos.delete({ where: { id } });

    return this.response.responseSend(null, 'Video deleted successfully', 200);
  }

  async addView(userId: string, videoId: string): Promise<void> {
    try {
      await this.prismaService.video_views.create({
        data: {
          user_id: userId,
          video_id: videoId,
        },
      });
    } catch (error) {
      // Nếu đã tồn tại (lỗi unique), thì bỏ qua
      if (error.code !== 'P2002') {
        throw error;
      }
    }
  }

  // 📊 Lấy tổng lượt xem video
  async getTotalViews(videoId: string): Promise<number> {
    return this.prismaService.video_views.count({
      where: {
        video_id: videoId,
      },
    });
  }

    // tim kiem video
    async searchVideos(keyword:string) {
      const response = await this.prismaService.videos.findMany({
        where: {
          title: {
            contains: keyword,
            mode: 'insensitive',
          },
        },
        include:{
          users:{
            
          }
        }
      });
      // console.log(response1)
      // const response=await this.prismaService.videos.findMany();
  
    
      return response
    }
}
