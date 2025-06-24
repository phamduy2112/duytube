import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';

@ApiTags('Comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo bình luận mới' })
  @ApiBody({ schema: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
      videoId: { type: 'string' },
      content: { type: 'string' },
      // thêm các trường khác nếu có
    }
  }})
  @ApiResponse({ status: 201, description: 'Bình luận được tạo' })
  createComment(@Body() data: any) {
    return this.commentService.create(data);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy danh sách bình luận theo video ID' })
  @ApiParam({ name: 'id', description: 'ID video' })
  @ApiResponse({ status: 200, description: 'Danh sách bình luận' })
  getComment(@Param('id') videoId: string) {
    return this.commentService.findByVideo(videoId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật bình luận theo video ID' })
  @ApiParam({ name: 'id', description: 'ID video' })
  @ApiBody({ schema: {
    type: 'object',
    properties: {
      content: { type: 'string' },
      // trường khác nếu có
    }
  }})
  putComment(@Param("id") videoId: string, @Body() body: any) {
    return this.commentService.update(videoId, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa bình luận theo video ID' })
  @ApiParam({ name: 'id', description: 'ID video' })
  @ApiResponse({ status: 200, description: 'Bình luận đã bị xóa' })
  deleteComent(@Param("id") videoId: string) {
    return this.commentService.remove(videoId);
  }

  @Get(':commentId/reaction')
  @ApiOperation({ summary: 'Lấy phản ứng của bình luận theo comment ID và user ID' })
  @ApiParam({ name: 'commentId', description: 'ID bình luận' })
  @ApiQuery({ name: 'clerk_user_id', description: 'ID người dùng Clerk' })
  getCommentReaction(
    @Param('commentId') commentId: string,
    @Query('clerk_user_id') clerkUserId: string,
  ) {
    return this.commentService.getReactionComment(clerkUserId, commentId);
  }

  @Post('/reactions')
  @ApiOperation({ summary: 'Thêm hoặc bỏ thích bình luận' })
  @ApiBody({ schema: {
    type: 'object',
    properties: {
      userId: { type: 'string' },
      comment_id: { type: 'string' },
      type: { type: 'string', description: 'Loại phản ứng (like, love, etc.)' },
    }
  }})
  toggleLike(@Body() dto: { userId: string; comment_id: string; type: string }) {
    return this.commentService.toggleLike(dto.userId, dto);
  }

  @Get('count/:commentId')
  @ApiOperation({ summary: 'Lấy số lượng like của bình luận theo comment ID' })
  @ApiParam({ name: 'commentId', description: 'ID bình luận' })
  getLikeCount(@Param('commentId') commentId: string) {
    return this.commentService.getLikeCount(commentId);
  }
}
