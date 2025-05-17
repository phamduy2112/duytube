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
  email: string;
  firstName: string;
  lastName: string;
}) {
  return this.prisma.users.create({
    data: {
      clerk_user_id: data.clerkId,
      channel_name: data.firstName+""+data.lastName,
    },
  });
}

}
