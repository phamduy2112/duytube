import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}
  toggleLike(user,dto){
    this.likesService.toggleLike(user,dto)
  }
  getLikeCount(data:{video_id:number}){
    this.likesService.getLikeCount(data.video_id)
  }


}
