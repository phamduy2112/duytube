import { Injectable } from '@nestjs/common';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/model/response';

@Injectable()
export class PlaylistsService {
 constructor(
  private prismaService:PrismaService,
      private readonly response: ResponseService,
  
 ){}

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

  async create( 
    title,
    description,
    user_id,
    video_id
  
  ) {
  // phải in ra giá trị UUID, không phải undefined hoặc null

    const existingUser = await this.prismaService.users.findFirst({
      where: { clerk_user_id: user_id }
    });
  
    if (!existingUser) {
      throw new Error('User not found');
    }
  
    const playlist = await this.prismaService.playlists.create({
      data: {
        title,
        description,
        user_id: existingUser.id
      }
    });
    const videoCount = await this.prismaService.playlist_videos.count({
      where: { playlist_id: playlist.id }
    });
  
    await this.prismaService.playlist_videos.create({
      data: {
        playlist_id: playlist.id,
        video_id,
        order: videoCount + 1
      }
    });
    

  
    return this.response.responseSend(playlist,"Successfully",200)
  }


  async getPlaylistUser(user_id: string) {
    const existingUser = await this.prismaService.users.findFirst({
      where: {
        clerk_user_id: user_id,

      },
    
    });
  
    if (!existingUser) {
      throw new Error('User not found');
    }
  
    const playlists = await this.prismaService.playlists.findMany({
      where: {
        user_id: existingUser.id
      },
      orderBy: {
        created_at: 'desc'
      },
      include:{
        playlist_videos:{
          include:{
            videos:{
              include:{
               users:{} 
              }
            }
          }
        },

      }
    });
  
    return this.response.responseSend(playlists,"Successfully",200)
  }
  

  findAll() {
    return `This action returns all playlists`;
  }

  async findOne(playlistId: string) {
    const playlistDetail = await this.prismaService.playlists.findUnique({
      where: {
        id: playlistId,
      },
      include: {
        playlist_videos: {
          orderBy: {
            order: 'asc', // sắp xếp theo thứ tự trong playlist
          },
          include: {
            videos: {
              include:{
                users:{} 
               }
            }, // lấy thông tin video đầy đủ
            
          },
        },
        users: true, // nếu bạn muốn lấy thêm thông tin người tạo playlist
      },
    });
    return this.response.responseSend(playlistDetail,"Successfully",200)

  }

  update(id: number, updatePlaylistDto: UpdatePlaylistDto) {
    return `This action updates a #${id} playlist`;
  }

async removeVideoFromPlaylist(playlist_id: string, video_id: string, type: string) {
  if (type === "playlists") {
    // Xoá toàn bộ video trong playlist
    await this.prismaService.playlist_videos.deleteMany({
      where: {
        playlist_id,
      },
    });

    // Xoá playlist
    await this.prismaService.playlists.delete({
      where: {
        id: playlist_id,
      },
    });

    return this.response.responseSend(null, "Playlist and all videos removed", 200);
  }

  // Nếu không phải xoá cả playlist, chỉ xoá 1 video trong playlist
  const existingRelation = await this.prismaService.playlist_videos.findUnique({
    where: {
      playlist_id_video_id: {
        playlist_id,
        video_id,
      },
    },
  });

  if (!existingRelation) {
    return this.response.responseSend(null, "Video is not in the playlist", 404);
  }

  await this.prismaService.playlist_videos.delete({
    where: {
      playlist_id_video_id: {
        playlist_id,
        video_id,
      },
    },
  });

  return this.response.responseSend(null, "Video removed from playlist", 200);
}


}
