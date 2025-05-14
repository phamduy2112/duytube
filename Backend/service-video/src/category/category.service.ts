import { Injectable } from '@nestjs/common';
import { ResponseService } from 'src/model/response';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
    constructor(private readonly prismaService:PrismaService,private readonly response:ResponseService){}
    async findAll(){
        try {
          const categories=await this.prismaService.categories.findMany();
          return this.response.responseSend(categories,"Successfully",200)
        } catch (error) {
          
        }
    
      }
      async findLimit(limit:number){
        try {
          const categories = await this.prismaService.categories.findMany({
            take: limit
          });
          return this.response.responseSend(categories,"Successfully",200)
        } catch (error) {
          
        }
      }
      async create(name:string){
          try {
            const slug = name.toLowerCase().replace(/\s+/g, '-'); // đơn giản hóa slug
            const create=await this.prismaService.categories.create({
              data:{
                name,
                slug
              }
            })
            return this.response.responseSend(create,"Create Category Successfully",200)
    
          } catch (error) {
            
          }
      }
      async put(id:string,name:string){
        try {
          const slug = name.toLowerCase().replace(/\s+/g, '-'); // đơn giản hóa slug
          const put=await this.prismaService.categories.update({
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
      async delete(id:string){
        try {
          const deleted=await this.prismaService.categories.delete({
            where:{
              id
            }
          })
          return this.response.responseSend(deleted,"Delete Category Successfully",200)
    
        } catch (error) {
          
        }
      }

}
