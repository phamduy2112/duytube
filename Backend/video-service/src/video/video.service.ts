import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { ResponseService } from 'src/model/response';

@Injectable()
export class VideoService {
  constructor(private readonly prismaService,
      private readonly response:ResponseService
    ){}
  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  findAll() {
    return `This action returns all video`;
  }

  async findOne(id: number) {
    try {
      const res=await this.prismaService.video.findOne({
          where:{id}
      })
      return this.response.responseSend(res,"Successfully",200);

    } catch (error) {
      
    }
  }

 async findByCategories(category_id:number){
 try {
  const res=await this.prismaService.video.findAll({
    where:{
      category_id
    }
  })
  return this.response.responseSend(res,"Successfully",200);
 } catch (error) {
  
 }

  }
  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
