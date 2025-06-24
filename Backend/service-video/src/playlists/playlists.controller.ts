import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Playlists')
@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService) {}

  @Post()
  @ApiOperation({ summary: 'Tạo playlist mới' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', example: 'My Playlist' },
        description: { type: 'string', example: 'This is a playlist for chill music' },
        user_id: { type: 'string', example: 'user123' },
        video_id: { type: 'string', example: 'video456' },
      },
      required: ['title', 'user_id', 'video_id'],
    },
  })
  @ApiResponse({ status: 201, description: 'Playlist created successfully' })
  create(@Body() createPlaylistDto: any) {
    const { title, description, user_id, video_id } = createPlaylistDto;
    return this.playlistsService.create(title, description, user_id, video_id);
  }

  @Post('create-video')
  @ApiOperation({ summary: 'Đồng bộ video vào playlist đã chọn' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        video_id: { type: 'string', example: 'video123' },
        selected: {
          type: 'array',
          items: { type: 'string', example: 'playlist1' },
        },
      },
      required: ['video_id', 'selected'],
    },
  })
  @ApiResponse({ status: 200, description: 'Video synced to playlists' })
  syncVideoToPlaylists(@Body() createPlaylistDto: any) {
    const { video_id, selected } = createPlaylistDto;
    return this.playlistsService.syncVideoToPlaylists(video_id, selected);
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Lấy tất cả playlist của user' })
  @ApiParam({ name: 'id', type: 'string', example: 'user123' })
  @ApiResponse({ status: 200, description: 'Danh sách playlists của user' })
  getPlaylistUser(@Param('id') id: string) {
    return this.playlistsService.getPlaylistUser(id);
  }
  @Get('/:id')
  @ApiOperation({ summary: 'Lấy tất cả playlist của user' })
  @ApiParam({ name: 'id', type: 'string', example: 'user123' })
  @ApiResponse({ status: 200, description: 'Danh sách playlists của user' })
  getPlaylistDetial(@Param('id') id: string) {
    return this.playlistsService.findOne(id);
  }
  @Delete('/:playlist_id/videos/:video_id')
@ApiOperation({ summary: 'Xoá video khỏi playlist' })
@ApiParam({ name: 'playlist_id', required: true, description: 'ID của playlist', example: 'playlist1' })
@ApiParam({ name: 'video_id', required: true, description: 'ID của video', example: 'video123' })
@ApiResponse({ status: 200, description: 'Video removed from playlist' })
@ApiResponse({ status: 404, description: 'Video is not in the playlist' })
remove(
  @Param('playlist_id') playlist_id: string,
  @Param('video_id') video_id: string,
) {
  return this.playlistsService.removeVideoFromPlaylist(playlist_id, video_id);
}
@Delete('/:playlist_id')
@ApiOperation({ summary: 'Xoá  playlist' })
@ApiParam({ name: 'playlist_id', required: true, description: 'ID của playlist', example: 'playlist1' })
@ApiResponse({ status: 200, description: 'Video removed from playlist' })
@ApiResponse({ status: 404, description: 'Video is not in the playlist' })
removePlaylist(
  @Param('playlist_id') playlist_id: string,

) {
  return this.playlistsService.deletePlaylist(playlist_id);
}

}
