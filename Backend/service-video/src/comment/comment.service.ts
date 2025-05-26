import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/model/response';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
    constructor(private prisma:PrismaService,
      private response:ResponseService,
    ){}
      // Thêm comment hoặc reply
      async create(data: {
        content: string;
        videoId: string;
        userId: string;
        parentId?: string;
      }) {
        const user = await this.prisma.users.findFirst({
          where: {
            clerk_user_id: data.userId, // <-- đây là `user_...`
          },
        });
        
        if (!user) {
          throw new Error("User not found");
        }
        return this.prisma.comments.create({
          data: {
            value: data.content,
            user_id:   user.id,
            video_id: data.videoId,
            parent_id: data.parentId ?? null, // nếu không có parentId thì set null
          },
        });
      }
      

  // Lấy danh sách comment + reply của video
  async findByVideo(videoId: string) {
    const response= await this.prisma.comments.findMany({
      where: {
        video_id: videoId,
        parent_id: null, // chỉ lấy comment cha
      },
      include: {
        users: true, // lấy user của comment cha
        other_comments: {
          include: {
            users: true, // lấy user của reply
          },
          orderBy: {
            created_at: 'asc',
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
    });
    return this.response.responseSend(response, "Successfully", 200);

  }
  
  

//   // Sửa comment
  async update(id: string, data: { content: string }) {
    return this.prisma.comments.update({
      where: { id },
      data: { value: data.content },
    });
  }

//   // Xóa comment (và reply nếu có)
  async remove(id: string) {
    // Xóa replies trước (nếu có)
    await this.prisma.comments.deleteMany({
      where: { parent_id: id },
    });

    // Xóa comment cha
    return this.prisma.comments.delete({
      where: { id },
    });
  }
// video_reactions
async toggleLike(userId: string, dto: { comment_id: string; type: string }) 
{

  const existing = await this.prisma.comment_reactions.findUnique({
      where: {
        user_id_comment_id: {
          user_id: userId,
          comment_id: dto.comment_id,
        },
      },
    });
  
    if (existing) {
      if (existing.type === dto.type) {
        await this.prisma.comment_reactions.delete({
          where: { id: existing.id },
        });
        return `Đã xóa ${dto.type}`;
      }
  
      return this.prisma.comment_reactions.update({
        where: { id: existing.id },
        data: { type: dto.type },
      });
    }
  
    // Nếu chưa tồn tại thì tạo mới
    return this.prisma.comment_reactions.create({
      data: {
        user_id: userId,
        comment_id: dto.comment_id,
        type: dto.type,
      },
    });
  }
  

 async getLikeCount(comment_id:string){
  const [likeCount,unlikeCount]=await Promise.all([
    this.prisma.comment_reactions.count({
      where:{
        comment_id,
        type:"like",
      }
    }),
    this.prisma.comment_reactions.count({
      where: {
        comment_id,
        type: 'unlike',
      },
    }),
  ])
  const response={
    like: likeCount,
    unlike: unlikeCount,
  }
      return this.response.responseSend(response, "Successfully", 200);

 }

}
