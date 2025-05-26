import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PlaylistsService } from './playlists.service';
import { CreatePlaylistDto } from './dto/create-playlist.dto';
import { UpdatePlaylistDto } from './dto/update-playlist.dto';
import { ResponseService } from 'src/model/response';

@Controller('playlists')
export class PlaylistsController {
  constructor(private readonly playlistsService: PlaylistsService,


  ) {}

  @Post()
  create(@Body() createPlaylistDto: any) {
    const {
      title,
      description,
      user_id,
      video_id}=createPlaylistDto
    return this.playlistsService.create(
      title,
      description,
      user_id,
      video_id);
  }
  @Post("create-video")
  syncVideoToPlaylists(@Body() createPlaylistDto: any) {
    const {
      video_id , selected
     
      }=createPlaylistDto
    return this.playlistsService.syncVideoToPlaylists(
      video_id , selected);
  }
  @Get()
  findAll() {
    return this.playlistsService.findAll();
  }
  @Get('user/:id')
  getPlaylistUser(@Param("id") id:string) {
    return this.playlistsService.getPlaylistUser(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playlistsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlaylistDto: UpdatePlaylistDto) {
    return this.playlistsService.update(+id, updatePlaylistDto);
  }

  @Delete('')
  remove(@Body body:any) {
  const {playlist_id, video_id, type}=body;
    return this.playlistsService.removeVideoFromPlaylist(playlist_id, video_id, type);
  }
}
