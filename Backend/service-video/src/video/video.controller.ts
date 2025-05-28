import { Controller, Get, Post, Body, Param, Delete, Patch, Query, Put } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('videos')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  // Tạo mới video và lấy upload_url từ Mux
  @Post()
  async create(@Body() body: { title: string; user_id: string; description?: string;category_id:string }) {
    return await this.videoService.create(body);
  }
  @Get("search")
  async search(@Query('keyword') keyword: string) {  
      return await this.videoService.searchVideos(keyword)
  }
  // Lấy toàn bộ video
  @Get()
  async findAll() {
    return await this.videoService.findAll();
  }
  @Get("user/:id")
  async getVideoByUser(@Param("id") user_id:string){
    console.log(user_id)
    return await this.videoService.getVideoByUser(user_id)
  }
    @Get(':videoId/reaction')
async getCommentReaction(
  @Param('videoId') videoId: string,
  @Query('clerk_user_id') clerkUserId: string,
) {
  return this.videoService.getReactionVideo(clerkUserId, videoId);
}

  @Get("studio/video/:id")
  async getVideoOne(@Param('id') id: string) {

  return await this.videoService.getVideoOne(id);
}
  // Lấy video theo id
  @Get(':id')
async findOne(@Param('id') id: string,  @Query('userId') userId?: string) {

  return await this.videoService.findOne(id, userId);
}

@Get('/reactions/:id')
async getLikeCountVideo(@Param("id") video_id:string){
  return await this.videoService.getLikeCount(video_id)
}

@Post("toogle-reactions")
async toogleReactionsVideo(@Body() body){
  return await this.videoService.toogleReactions(body);
}
@Get("limit/:id")
async findLimit(@Param('id') id: string){
  return await this.videoService.findLimit(+id);
}

  // Lấy video theo category
  @Get('/category/:id')
  async findByCategory(@Param('id') id: string) {
    return await this.videoService.findByCategories(id);
  }

  // Cập nhật video
  @Put(':id')
  async update(@Param('id') id: string, @Body() body:any) {
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
  @Get('/history/:id')
  async getHistories(@Param("id") user_id:string){
    return await this.videoService.getHistory(user_id);

  }
  @Get('/like/:id')
  async getLikeVideoUser(@Param("id") user_id:string){
    return await this.videoService.getLikeVideoByUser(user_id);

  }


  
}
