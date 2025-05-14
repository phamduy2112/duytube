import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}
  
  @Post()
  createComment(@Body() data){
    return this.commentService.create(data)
  }

  @Get(':id')
  getComment(@Param('id') videoId: string)
  {

    return this.commentService.findByVideo(videoId);

  }

  @Put(':id')
  putComment(@Param("id") videoId:string,@Body() body){
      return this.commentService.update(videoId,body)
  }
  
  @Delete(':id')
  deleteComent(@Param("id") videoId:string){
    return this.commentService.remove(videoId)
  }

  @Post('/reactions')
  async toggleLike(
    @Body() dto: {
      userId,
      comment_id: string; type: string },
  ) {
    return this.commentService.toggleLike(dto.userId, dto);
  }

  @Get('count/:commentId')
  async getLikeCount(@Param('commentId') commentId: string) {
    return this.commentService.getLikeCount(commentId);
  }
}
