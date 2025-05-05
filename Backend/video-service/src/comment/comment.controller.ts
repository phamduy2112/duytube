import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  create(@Body() body: any) {
    return this.commentService.create(body);
  }

  @Get(':videoId')
  findByVideo(@Param('videoId') videoId: string) {
    return this.commentService.findByVideo(+videoId);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.commentService.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentService.remove(+id);
  }
}
