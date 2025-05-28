import Mux from '@mux/mux-node';
import { Injectable, NotFoundException } from '@nestjs/common';
import { IResponse, ResponseService } from 'src/model/response';
import { PrismaService } from 'src/prisma/prisma.service';
import { IVideo } from 'src/type/video.type';

@Injectable()
export class VideoService {
  private readonly uploads;
  private readonly assets;

  constructor(
    private readonly prismaService: PrismaService,
    private readonly response: ResponseService,
  ) {
    const muxClient = new Mux({
      tokenId: "979ef3f7-8800-499a-8429-e3626146a2e4",
      tokenSecret: "UPN8ulYgp4jalwi3JormkIyEpzu+5dq3IXYJ2inJx/bUX1riQgU9nnRHwIy/yrkKTKIFHtNrsPV",
    });

    this.uploads = muxClient.video.uploads;
    this.assets = muxClient.video.assets;
  }
 async findLimit(limit:number){
        try {
          const videos = await this.prismaService.videos.findMany({
            take: limit,
             include: {
      users: true,
      video_views:true,
      video_reactions:true
    }
          });
          return this.response.responseSend(videos,"Successfully",200)
        } catch (error) {
          
        }
      }
  // Tạo video và lấy upload_url từ Mux
  async create(data: { title: string; user_id: string; description?: string;category_id:string}) {
 try {
     const user = await this.prismaService.users.findFirst({
      where: {
        clerk_user_id: data.user_id
      }
    });

    // Nếu không tìm thấy user thì không tiếp tục
    if (!user) {
      throw new Error("User not found");
    }
    const upload = await this.uploads.create({
      new_asset_settings: {
        playback_policy: 'public',
      },
      cors_origin: '*', // ⚠️ rất quan trọng!
    });
  
    const video = await this.prismaService.videos.create({
      data: {
        title: data.title,
        description: data.description,
        user_id: user.id,
        category_id:data.category_id,
        mux_status: 'waiting_upload',
        mux_upload_id: upload.id,
      },
    });

    return {
      video,
      upload_url: upload.url,
    };
 } catch (error) {
  console.log(error )
 }
  }
  async checkMuxUploadStatus(uploadId: string) {
   try {
     const upload = await this.uploads.retrieve(uploadId);
  
    // Nếu Mux đã gán asset_id cho upload thì video đã xử lý xong
    if (upload.asset_id) {
      const asset = await this.assets.retrieve(upload.asset_id);
  
      const playbackId = asset.playback_ids?.[0]?.id;
  
      await this.prismaService.videos.updateMany({
        where: { mux_upload_id: uploadId },
        data: {
          mux_asset_id: asset.id,
          mux_playback_id: playbackId,
          mux_status: 'ready',
        },
      });
  
      return {
        status: 'ready',
        asset_id: asset.id,
        playback_id: playbackId,
      };
    }
  
    return { status: 'processing' };
   } catch (error) {
    console.log(error)
   }
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
    include: {
      users: true,
      video_views:true,
      video_reactions:true
    }
  });

  return this.response.responseSend(videos, 'Videos fetched successfully', 200);
}
  async findVideoByUser(userId){
    try {
      const user = await this.prismaService.users.findFirst({
        where: {
          clerk_user_id: userId
        }
      });
  
      // Nếu không tìm thấy user thì không tiếp tục
      if (!user) {
        throw new Error("User not found");
      }
      const response=await this.prismaService.videos.findMany({
        where:{
          user_id:userId
        },
       include: {
      users: true,
      video_views:true,
      video_reactions:true
    }
      })
    return this.response.responseSend(response, 'Video updated successfully', 200);
    } catch (error) {
      
    }
  }
  async getVideoByUser(user_id:string){
    const existingUser=await this.prismaService.users.findFirst({
      where:{
        clerk_user_id:user_id,
      }
    })  
    

    const response=await this.prismaService.videos.findMany({
      where:{
        user_id:existingUser?.id
      },
      include:{
        video_reactions:true,
        video_views:true,
        comments:true
      }
    })
    return this.response.responseSend(response,"Successfully",200)

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
    return this.response.responseSend(videos,"Successfully",200)
  }
  
  // Lấy một video theo id
  async findOne(id: string, userId?: string) {
    const video = await this.prismaService.videos.findFirst({ where: { id },
    include:{
      users:{
        include:{
          subscriptions_subscriptions_creator_idTousers:true,
          subscriptions_subscriptions_viewer_idTousers:true
        }
      },
     video_views:true,
     video_reactions:true,

    } }

 
    );
  
    if (!video) {
      throw new NotFoundException('Video not found');
    }
  
    // Kiểm tra userId có tồn tại thì mới gọi addView
    if (userId) {
        this.addView(userId, video.id);
    }
    const total=this.getTotalViews(video.id)
    const responseVideo={
      ...video,
      total
      
      
    }
    return this.response.responseSend(responseVideo, 'Video fetched successfully', 200);
  }
   async getReactionVideo(clerk_user_id: string, video_id: string) {
  try {
    const user = await this.prismaService.users.findUnique({
      where: {
        clerk_user_id,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const reaction = await this.prismaService.videos.findFirst({
      where: {
        user_id: user.id,
        id: video_id,
      },
    });

    return reaction;
  } catch (error) {
    console.error("Error in getReactionComment:", error);
    throw error;
  }
}

  async getVideoOne(id:string){


    
      const video = await this.prismaService.videos.findFirst({ where: { id },
    include:{
      users:{
        include:{
          subscriptions_subscriptions_creator_idTousers:true,
          subscriptions_subscriptions_viewer_idTousers:true
        }
      },
     video_views:true,

    } }

 
    );
  
    if (!video) {
      throw new NotFoundException('Video not found');
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
  async update(id: string, updateVideoDto: any) {
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

  async addView(userId: string, videoId: string) {
    try {
      const user = await this.prismaService.users.findFirst({
        where: {
          clerk_user_id: userId
        }
      });
  
      // Nếu không tìm thấy user thì không tiếp tục
      if (!user) {
        throw new Error("User not found");
      }
  
      const resp = await this.prismaService.video_views.create({
        data: {
          user_id: user?.id, // lúc này chắc chắn là string
          video_id: videoId,
        },
      });
  
      return resp;
    } catch (error: any) {
      // Nếu là lỗi unique constraint thì bỏ qua
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
     try {
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

         return this.response.responseSend(response, 'Search video successfully', 200);

     } catch (error) {
      return error      
     }
    }
    // 
    async toogleReactions(dto: { clerk_user_id: string; video_id: string; type: string }) {
      try {
        
        // 1. Tìm user từ clerk_user_id
        const user = await this.prismaService.users.findFirst({
          where: {
            clerk_user_id: dto.clerk_user_id,
          },
        });
    
        if (!user) {
          throw new Error("User not found");
        }
    
        const user_id = user.id;
    
        // 2. Kiểm tra xem đã có reaction cho video này chưa
        const existingReaction = await this.prismaService.video_reactions.findUnique({
          where: {
            user_id_video_id: {
              user_id,
              video_id: dto.video_id,
            },
          },
        });
    
        if (!existingReaction) {
          // Nếu chưa có => tạo mới
          return await this.prismaService.video_reactions.create({
            data: {
              user_id,
              video_id: dto.video_id,
              type: dto.type,
            },
          });
        } else if (existingReaction.type === dto.type) {
          // Nếu type giống => xóa (toggle off)
          return await this.prismaService.video_reactions.delete({
            where: { id: existingReaction.id },
          });
        } else {
          // Nếu type khác => cập nhật
          return await this.prismaService.video_reactions.update({
            where: { id: existingReaction.id },
            data: { type: dto.type },
          });
        }
    
      } catch (error) {
        console.error('Error in toogleReactions:', error);
        throw error;
      }
    }
    
    
    async getLikeCount(video_id: string) {
      if (!video_id || typeof video_id !== 'string') {
        // throw new BadRequestException('Invalid video_id');
      }
    
      try {
        const [like, unlike] = await Promise.all([
          this.prismaService.video_reactions.count({
            where: { video_id, type: 'like' },
          }),
          this.prismaService.video_reactions.count({
            where: { video_id, type: 'unlike' },
          }),
        ]);
    
        return { like, unlike };
      } catch (error) {
        console.error('Error in getLikeCount:', error);
        // throw new InternalServerErrorException('Cannot fetch reaction counts');
      }
    }

    async getHistory(user_id:string){

      try {
        const existingUser=await this.prismaService.users.findFirst({
          where:{
            clerk_user_id:user_id,
          },
         

        })  
        const getHistoryUser=await this.prismaService.video_views.findMany({
          where:{
            user_id:existingUser?.id
          },
          include:{
      
            videos:{
              include:{
                users:{},
                video_views:{},
              }
            },
          
          }
        })
              return this.response.responseSend(getHistoryUser, 'Search video successfully', 200);

      } catch (error) {
        
      }
    }

    async getLikeVideoByUser(user_id:string){
      const existingUser=await this.prismaService.users.findFirst({
        where:{
          clerk_user_id:user_id,
        }
      })  
      const response=await this.prismaService.video_reactions.findMany({
        where:{
          user_id:existingUser?.id,
          type:"like"
        },
        include:{
      
          videos:{
            include:{
              users:{},
              video_views:{},
            }
          },
        
        }

      }) 
      return this.response.responseSend(response,"Successfully",200);
    }
    
  //  
    
}
