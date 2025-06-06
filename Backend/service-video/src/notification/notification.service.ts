import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class NotificationService {
  constructor(
    private prisma:PrismaService,
  ){}
  async create(createNotificationDto: any) {
    const { type, video_id, content, clerk_user_id,user_id } = createNotificationDto;
  
    const existingUser = await this.prisma.users.findFirst({
      where: {
        clerk_user_id,
      },
    });
  
    if (!existingUser) {
      return null; // Không tìm thấy user → không tạo notification
    }
  
    const notification = await this.prisma.notifications.create({
      data: {
        type,
        video_id,
        content,
        user_id,
        is_read:false,
        clerk_user_id: existingUser.id, // dùng id từ bảng users
      
      },
    });
  
    return notification;
  }
  async findAllByUser(clerk_user_id: string) {
    const user = await this.prisma.users.findFirst({
      where: { clerk_user_id },
    });
  
    if (!user) return [];
  
    // 1. Xoá toàn bộ thông báo đã đọc
    await this.prisma.notifications.deleteMany({
      where: {
        user_id: user.id,
        is_read: true,
      },
    });
  
    // 2. Trả về các thông báo chưa đọc
    const notifications = await this.prisma.notifications.findMany({
      where: {
        user_id: user.id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  
    return notifications;
  }
  

  findAll() {
    return `This action returns all notification`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  update(id: number, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
