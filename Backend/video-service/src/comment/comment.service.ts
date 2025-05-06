import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  // Thêm comment hoặc reply
  async create(data: {
    content: string;
    videoId: number;
    userId: number;
    parentId?: number;
  }) {
    return this.prisma.comment.create({
      data: {
        content: data.content,
        videoId: data.videoId,
        userId: data.userId,
        parentId: data.parentId || null,
      },
    });
  }

  // Lấy danh sách comment + reply của video
  async findByVideo(videoId: number) {
    return this.prisma.comment.findMany({
      where: {
        videoId,
        parentId: null,
      },
      include: {
        user: true,
        replies: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  // Sửa comment
  async update(id: number, data: { content: string }) {
    return this.prisma.comment.update({
      where: { id },
      data: { content: data.content },
    });
  }

  // Xóa comment (và reply nếu có)
  async remove(id: number) {
    // Xóa replies trước (nếu có)
    await this.prisma.comment.deleteMany({
      where: { parentId: id },
    });

    // Xóa comment cha
    return this.prisma.comment.delete({
      where: { id },
    });
  }
}
