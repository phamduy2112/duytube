import { Injectable } from '@nestjs/common';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class WebhookService {
  constructor(private prisma:PrismaService){}
  // user.service.ts
  async createFromClerk(data: {
    clerkId: string;
    urlImage: string;
    fullName: string;
  }) {
    const existingUser = await this.prisma.users.findFirst({
      where: {
        clerk_user_id: data.clerkId,
      },
    });
  
    if (!!existingUser) {
      return null; // hoặc return null nếu bạn muốn báo là đã tồn tại
    }
  
    const response = await this.prisma.users.create({
      data: {
        clerk_user_id: data.clerkId,
        channel_name: data.fullName,
        avatar_url: data.urlImage,
        has_created: true,
      },
    });
  
    return response;
  }
  async getUserClerk(data){
    
    const existingUser = await this.prisma.users.findFirst({
      where: {
        clerk_user_id: data.clerkId,
      },
    });

    return existingUser
  }
  

}
