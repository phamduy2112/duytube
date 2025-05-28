import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscripeDto } from './dto/create-subscripe.dto';
import { UpdateSubscripeDto } from './dto/update-subscripe.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscripeService {

  constructor(private prismaService:PrismaService){}
  
  async create(viewerClerkId: string, creatorId: string) {
    if (viewerClerkId === creatorId) {
      return;
    }
  
    // Tìm user theo clerk_user_id
    const existingUser = await this.prismaService.users.findFirst({
      where: {
        clerk_user_id: viewerClerkId,
      },
    });
  
    // Nếu không tìm thấy user thì dừng
    if (!existingUser) {
      throw new Error('Viewer not found');
    }
  
    const viewerInternalId = existingUser.id;
  
    // Kiểm tra xem đã đăng ký chưa
    const existingSubscription = await this.prismaService.subscriptions.findUnique({
      where: {
        viewer_id_creator_id: {
          viewer_id: viewerInternalId,
          creator_id: creatorId,
        },
      },
    });
  
    if (existingSubscription) {
      // Hủy đăng ký
      await this.prismaService.subscriptions.delete({
        where: {
          viewer_id_creator_id: {
            viewer_id: viewerInternalId,
            creator_id: creatorId,
          },
        },
      });
      return { subscribed: false };
    } else {
      // Tạo đăng ký mới
      await this.prismaService.subscriptions.create({
        data: {
          viewer_id: viewerInternalId,
          creator_id: creatorId,
        },
      });
      return { subscribed: true };
    }
  }
  


  async getMySubscriptions(viewerId: string) {
  const users = await this.prismaService.users.findMany({
    where: {
      subscriptions_subscriptions_viewer_idTousers: {
        some: {
          viewer_id: viewerId,
        },
      },
    },
  });

  return users;
}


  async getSubscribersOfCreator(creatorId:string){
    const subs=await this.prismaService.subscriptions.findMany({
      where:{
        creator_id:creatorId
      },
      include:{
        users_subscriptions_creator_idTousers:true,
      }
    })
    return subs.map((s)=>s.users_subscriptions_creator_idTousers);
  }

  async checkSubscribers(viewerId: string, creatorId: string){
    const existingUser = await this.prismaService.users.findFirst({
      where: {
        clerk_user_id: viewerId,
      },
    });
  
    if (!existingUser) {
      throw new NotFoundException('Viewer user not found');
    }
  
    const existing = await this.prismaService.subscriptions.findUnique({
      where: {
        viewer_id_creator_id: {
          viewer_id: existingUser.id,
          creator_id: creatorId,
        },
      },
    });
  
    return {
      subscribed: !!existing,
    };
  }
  async  syncVideoToPlaylists(video_id: string, selected: string[]) {
    // 1. Lấy playlist hiện có chứa video
    const currentPlaylistVideos = await this.prismaService.playlist_videos.findMany({
      where: { video_id },
      select: { playlist_id: true }
    });
  
    const currentPlaylistIds = currentPlaylistVideos.map(pv => pv.playlist_id);
  
    // 2. Tính playlist cần thêm và playlist cần xóa
    const toAdd = selected.filter(id => !currentPlaylistIds.includes(id));
    const toRemove = currentPlaylistIds.filter(id => !selected.includes(id));
  
    // 3. Thêm video vào các playlist mới
    await Promise.all(
      toAdd.map(async playlist_id => {
        const videoCount = await this.prismaService.playlist_videos.count({ where: { playlist_id } });
        await this.prismaService.playlist_videos.create({
          data: {
            playlist_id,
            video_id,
            order: videoCount + 1
          }
        });
      })
    );
  
    // 4. Xóa video khỏi các playlist không nằm trong selected
    await this.prismaService.playlist_videos.deleteMany({
      where: {
        video_id,
        playlist_id: { in: toRemove }
      }
    });
  
    return { added: toAdd.length, removed: toRemove.length };
  }

  
  findAll() {
    return `This action returns all subscripe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscripe`;
  }

  update(id: number, updateSubscripeDto: UpdateSubscripeDto) {
    return `This action updates a #${id} subscripe`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscripe`;
  }
}
