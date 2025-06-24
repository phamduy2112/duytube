import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo thông báo mới' })
  @ApiBody({ type: CreateNotificationDto })
  @ApiResponse({ status: 201, description: 'Tạo thông báo thành công' })
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy tất cả thông báo của người dùng' })
  @ApiParam({ name: 'id', description: 'ID của người dùng', example: 'user123' })
  @ApiResponse({ status: 200, description: 'Danh sách thông báo' })
  findOne(@Param('id') id: string) {
    return this.notificationService.findAllByUser(id);
  }
}
