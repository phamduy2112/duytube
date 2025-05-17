import { Controller, Post, HttpCode, Req, Res, Body, Get } from '@nestjs/common';
import { Request, Response } from 'express';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly userService: WebhookService) {}
  @Get()
  handleGet(@Body() payload: any) {
    console.log('Get webhook:', payload);
    return { received: true };
  }
  

  @Post()
  handleWebhook(@Body() payload: any) {
    console.log('Received webhook:', payload);
    return { received: true };
  }
  
}
