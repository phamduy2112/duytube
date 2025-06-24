import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { SubscripeService } from './subscripe.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Subscripe')
@Controller('subscripe')
export class SubscripeController {
  constructor(private readonly subscripeService: SubscripeService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo subscription giữa viewer và creator' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        viewerId: { type: 'string', example: 'user123' },
        creatorId: { type: 'string', example: 'creator456' },
      },
      required: ['viewerId', 'creatorId'],
    },
  })
  @ApiResponse({ status: 201, description: 'Subscription created' })
  create(@Body() createSubscripeDto: any) {
    const { viewerId, creatorId } = createSubscripeDto;
    return this.subscripeService.create(viewerId, creatorId);
  }

  @Get('get/:viewerId')
  @ApiOperation({ summary: 'Lấy danh sách các subscriptions của viewer' })
  @ApiParam({ name: 'viewerId', type: 'string', example: 'user123' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách subscriptions của người dùng',
  })
  findMySubscriptions(@Param('viewerId') viewerId: string) {
    return this.subscripeService.getMySubscriptions(viewerId);
  }

  @Get('status')
  @ApiOperation({ summary: 'Kiểm tra trạng thái subscription' })
  @ApiQuery({ name: 'viewerId', type: 'string', example: 'user123' })
  @ApiQuery({ name: 'creatorId', type: 'string', example: 'creator456' })
  @ApiResponse({
    status: 200,
    description: 'Trạng thái subscription (true/false)',
  })
  async getSubscriptionStatus(
    @Query('viewerId') viewerId: string,
    @Query('creatorId') creatorId: string,
  ) {
    return this.subscripeService.checkSubscribers(viewerId, creatorId);
  }


}
