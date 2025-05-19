import { Controller, Post, HttpCode, Req, Res, Body, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly userService: WebhookService) {}
  @Post("/get")
  async handleGet(@Body() payload: any) {
    return await this.userService.getUserClerk(payload);
  }
  

  @Post()
  async handleWebhook(@Body() payload: any) {
    
    return await this.userService.createFromClerk(payload);
  }
  
  
}
