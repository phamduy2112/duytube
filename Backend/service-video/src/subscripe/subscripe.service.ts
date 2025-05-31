import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubscripeDto } from './dto/create-subscripe.dto';
import { UpdateSubscripeDto } from './dto/update-subscripe.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscripeService {

  constructor(private prismaService:PrismaService){}
  
async create(viewerClerkId: string, creatorClerkId: string) {
  if (viewerClerkId === creatorClerkId) return;

  const viewer = await this.prismaService.users.findFirst({
    where: { clerk_user_id: viewerClerkId },
  });

  const creator = await this.prismaService.users.findFirst({
    where: { clerk_user_id: creatorClerkId },
  });

  if (!viewer) throw new Error('Viewer not found');
  if (!creator) throw new Error('Creator not found');

  const viewerInternalId = viewer.id;
  const creatorInternalId = creator.id;

  if (viewerInternalId === creatorInternalId) return;

  const existingSubscription = await this.prismaService.subscriptions.findUnique({
    where: {
      viewer_id_creator_id: {
        viewer_id: viewerInternalId,
        creator_id: creatorInternalId,
      },
    },
  });

  if (existingSubscription) {
    await this.prismaService.subscriptions.delete({
      where: {
        viewer_id_creator_id: {
          viewer_id: viewerInternalId,
          creator_id: creatorInternalId,
        },
      },
    });
    return { subscribed: false };
  } else {
    await this.prismaService.subscriptions.create({
      data: {
        viewer_id: viewerInternalId,
        creator_id: creatorInternalId,
      },
    });
    return { subscribed: true };
  }
}



  async getMySubscriptions(data: string) {
   const user = await this.prismaService.users.findFirst({
      where: { clerk_user_id: data },
      include: {
        subscriptions_subscriptions_viewer_idTousers: {
          include: {
            users_subscriptions_creator_idTousers: {
              include:{
                videos:{
                    include: {
      users: true,
      video_views:true,
      video_reactions:true
    }
                },
              }
            }, // lấy info creator (người được follow)
            
          },
        },
        subscriptions_subscriptions_creator_idTousers: {
          include: {
            users_subscriptions_viewer_idTousers: {
                 include:{
                videos:{
                    include: {
      users: true,
      video_views:true,
      video_reactions:true
    }
                },
              }
            }, // lấy info viewer (người follow)
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return user;
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
