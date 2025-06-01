import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SubscripeService } from './subscripe.service';
import { CreateSubscripeDto } from './dto/create-subscripe.dto';
import { UpdateSubscripeDto } from './dto/update-subscripe.dto';

@Controller('subscripe')
export class SubscripeController {
  constructor(private readonly subscripeService: SubscripeService) {}
  // INSERT INTO subscriptions (id, viewer_id, creator_id)
  // VALUES
  //   (gen_random_uuid(), 'a89d8a5a-cbe1-440e-819d-1216c8592c2b', 'f78a839f-bd0d-4a77-81a7-62ec7b645dda'), -- Phạm Duy → Duy Dev
  //   (gen_random_uuid(), 'f78a839f-bd0d-4a77-81a7-62ec7b645dda', '8603c6d6-1475-4729-8e08-2c843e03cc28'), -- Duy Dev → CodeMaster
  //   (gen_random_uuid(), '8603c6d6-1475-4729-8e08-2c843e03cc28', 'a89d8a5a-cbe1-440e-819d-1216c8592c2b'); -- CodeMaster → Phạm Duy
  
  @Post()
  create(@Body() createSubscripeDto: any) {
    const {viewerId,creatorId}=createSubscripeDto;
    return this.subscripeService.create(viewerId,creatorId);
  }
  

  @Get("get/:viewerId")
  findMySubscriptions(@Param("viewerId") viewerId:string ) {
    
    return this.subscripeService.getMySubscriptions(viewerId);
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
