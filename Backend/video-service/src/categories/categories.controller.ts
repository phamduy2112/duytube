import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
// Schema
// model Category {
//   id        Int       @id @default(autoincrement())
//   name      String    @unique
//   slug      String    @unique


//   createdAt DateTime  @default(now())
//   updatedAt DateTime  @updatedAt

//   videos    Video[]   // Mối quan hệ 1-n với bảng Video
// }
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
  

  // get-all
  
  findAll(){
    return this.categoriesService.findAll();
  }
  
  findLimit(limit:string){
    return this.categoriesService.findLimit(+limit)
  }

  create(data:{name:string}){
    return this.categoriesService.create(data.name);
  }

  put(data:{name:string,id:number}){
    return this.categoriesService.put(data.id,data.name)
  }
  deleted(data:{id:number}){
    return this.categoriesService.delete(data.id);
  }
}
