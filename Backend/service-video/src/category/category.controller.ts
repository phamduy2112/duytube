import { Controller, Get, Post, Put, Delete, Body, Query } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }
  @Get("/get")
  findAllA() {
    return [{ id: 1, name: 'Dien thoai' }];
  }
  @Get('limit')
  findLimit(@Query('limit') limit: string) {
    return this.categoryService.findLimit(+limit);
  }

  @Post()
  create(@Body() data: { name: string }) {
    return this.categoryService.create(data.name);
  }

  @Put()
  put(@Body() data: { name: string; id: string }) {
    return this.categoryService.put(data.id, data.name);
  }

  @Delete()
  deleted(@Body() data: { id: string }) {
    return this.categoryService.delete(data.id);
  }
}
