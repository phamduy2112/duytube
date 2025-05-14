import { Injectable } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaClient } from '@prisma/client';


@Injectable()
export class LikesService {
    private prisma = new PrismaClient(); // Khởi tạo Prisma Client
  
  constructor(){}
  async toggleLike(userId: number, dto: any) {
    const existing=await this.prisma.like.findUnique({
      where: {
        userId_videoId: {
          userId,
          videoId: dto.videoId,
        },
      },
    })
    if(existing){
      if(existing.type===dto.type){
        await this.prisma.like.delete({
          where:{id:existing.id}
        })
        return `Delete ${dto.type} Commented`
      }
      return this.prisma.like.update({
        where: { id: existing.id },
        data: { type: dto.type },
      })
    }
      // Nếu chưa tồn tại => tạo mới
  return this.prisma.like.create({
    data: {
      userId,
      videoId: dto.videoId,
      type: dto.type,
    },
  });
  }

 async getLikeCount(video_id:number){
  const [likeCount,unlikeCount]=await Promise.all([
    this.prisma.like.count({
      where:{
        video_id,
        type:"like",
      }
    }),
    this.prisma.like.count({
      where: {
        video_id,
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
