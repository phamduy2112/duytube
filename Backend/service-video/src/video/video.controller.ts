import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  // Tạo mới video và lấy upload_url từ Mux
  @Post()
  async create(@Body() body: { title: string; user_id: string; description?: string;category_id:string }) {
    return await this.videoService.create(body);
  }

  // Lấy toàn bộ video
  @Get()
  async findAll() {
    return await this.videoService.findAll();
  }

  // Lấy video theo id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.videoService.findOne(id);
  }

  // Lấy video theo category
  @Get('/category/:id')
  async findByCategory(@Param('id') id: string) {
    return await this.videoService.findByCategories(id);
  }

  // Cập nhật video
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: { title?: string; description?: string }) {
    return await this.videoService.update(id, body);
  }

  // Xóa video
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.videoService.remove(id);
  }

  // Tạo user mới (tùy chọn - nếu bạn muốn test user)
  @Post('/user')
  async createUser(@Body() body: { clerk_user_id: string; channel_name: string; avatar_url?: string; bio?: string }) {
    return await this.videoService.createUser(body);
  }
  @Post('view/:id')
  async addView(@Param('id') videoId: string, @Body('userId') userId: string) {
    await this.videoService.addView(userId, videoId);
    return { message: 'Lượt xem đã được ghi nhận (nếu chưa từng xem)' };
  }

  // GET /video/views/:id
  @Get('views/:id')
  async getViews(@Param('id') videoId: string) {
    const count = await this.videoService.getTotalViews(videoId);
    return { videoId, views: count };
  }
  // 
  @Get("a")
  async searchVideo(){
    return await this.videoService.findAll()
  }
}
