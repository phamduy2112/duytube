import { Controller, Post, HttpCode, Req, Res, Body, Get, Headers } from '@nestjs/common';
import { Request, Response } from 'express';
import { WebhookService } from './webhook.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('')
export class WebhookController {
  constructor(private readonly userService: WebhookService,
private prisma:PrismaService

  ) {}
  @Post("/get")
  async handleGet(@Body() payload: any) {
    return await this.userService.getUserClerk(payload);
  }
  @Post('/mux/webhook')
  async handleWebhook(@Body() body: any, @Headers() headers: any) {
    console.log('📦 Mux webhook received:', body);

    if (body.type === 'video.asset.ready') {
      const uploadId = body.data.upload_id;
      const assetId = body.data.id;
      const playbackId = body.data.playback_ids?.[0]?.id;

      await this.prisma.videos.updateMany({
        where: { mux_upload_id: uploadId },
        data: {
          mux_asset_id: assetId,
          mux_playback_id: playbackId,
          mux_status: 'ready',
        },
      });

      console.log(`✅ Video updated: asset_id=${assetId}, playback_id=${playbackId}`);
    }

    return { received: true };
  }
  @Post('/clerk/webhook')
    async handleWebshook(@Body() body:any){
      return await this.userService.createFromClerk(body)
    }
  

  // @Post()
  // async handleWebhook(@Body() payload: any) {
    
  //   return await this.userService.createFromClerk(payload);
  // }
  
  
}
