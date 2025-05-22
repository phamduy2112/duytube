import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubscripeService } from './subscripe.service';
import { CreateSubscripeDto } from './dto/create-subscripe.dto';
import { UpdateSubscripeDto } from './dto/update-subscripe.dto';

@Controller('subscripe')
export class SubscripeController {
  constructor(private readonly subscripeService: SubscripeService) {}

  @Post()
  create(@Body() createSubscripeDto: any) {
    const {viewerId,creatorId}=createSubscripeDto;
    return this.subscripeService.create(viewerId,creatorId);
  }

  @Get("get")
  findMySubscriptions(@Param("viewerId") viewerId:string ) {
    
    return this.subscripeService.getSubscribersOfCreator(viewerId);
  }


@Get('status')
async getSubscriptionStatus(
  @Query('viewerId') viewerId: string,
  @Query('creatorId') creatorId: string,
){
return this.subscripeService.checkSubscribers(viewerId,creatorId)
} 

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscripeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscripeDto: UpdateSubscripeDto) {
    return this.subscripeService.update(+id, updateSubscripeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscripeService.remove(+id);
  }
}
