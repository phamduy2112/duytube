import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
    constructor(private prisma:PrismaService){}
      // Thêm comment hoặc reply
      async create(data: {
        content: string;
        videoId: string;
        userId: string;
        parentId?: string;
      }) {
        return this.prisma.comments.create({
          data: {
            value: data.content,
            user_id: data.userId,
            video_id: data.videoId,
            parent_id: data.parentId ?? null, // nếu không có parentId thì set null
          },
        });
      }
      

  // Lấy danh sách comment + reply của video
  async findByVideo(videoId: string) {
    return this.prisma.comments.findMany({
      where: {
        video_id:videoId,
        parent_id: null,
      },
      include: {
        users: true,
        
      },
      orderBy: {
        created_at: 'desc',
      },
    });
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
async toggleLike(userId: string, dto: { comment_id: string; type: string }) {
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
  return {
    like: likeCount,
    unlike: unlikeCount,
  };
 }

}
