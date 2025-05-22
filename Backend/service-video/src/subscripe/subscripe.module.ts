import { Module } from '@nestjs/common';
import { SubscripeService } from './subscripe.service';
import { SubscripeController } from './subscripe.controller';

@Module({
  controllers: [SubscripeController],
  providers: [SubscripeService],
})
export class SubscripeModule {}
