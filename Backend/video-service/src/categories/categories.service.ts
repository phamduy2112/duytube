import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ResponseService } from 'src/model/response';

@Injectable()
export class CategoriesService {
  constructor(private readonly prismaService,
    private readonly response:ResponseService
  ){}
 async findAll(){
    try {
      const categories=await this.prismaService.category();
      return this.response.responseSend(categories,"Successfully",200)
    } catch (error) {
      
    }

  }
  async findLimit(limit:number){
    try {
      const categories = await this.prismaService.category.findMany({
        take: limit
      });
      return this.response.responseSend(categories,"Successfully",200)
    } catch (error) {
      
    }
  }
  async create(name:string){
      try {
        const slug = name.toLowerCase().replace(/\s+/g, '-'); // đơn giản hóa slug
        const create=await this.prismaService.category.create({
          data:{
            name,
            slug
          }
        })
        return this.response.responseSend(create,"Create Category Successfully",200)

      } catch (error) {
        
      }
  }
  async put(id:number,name:string){
    try {
      const slug = name.toLowerCase().replace(/\s+/g, '-'); // đơn giản hóa slug
      const put=await this.prismaService.category.put({
        where:{
          id
        },
        data:{
          name
        }
      })
      return this.response.responseSend(put,"Edit Category Successfully",200)
    } catch (error) {
      
    }
  }
  async delete(id:number){
    try {
      const deleted=await this.prismaService.category.delete({
        where:{
          id
        }
      })
      return this.response.responseSend(deleted,"Delete Category Successfully",200)

    } catch (error) {
      
    }
  }
}
