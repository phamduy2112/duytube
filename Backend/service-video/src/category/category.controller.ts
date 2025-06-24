import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  @ApiOperation({ summary: 'Lấy toàn bộ danh sách category' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách tất cả category',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('limit')
  @ApiOperation({ summary: 'Lấy danh sách category với giới hạn' })
  @ApiQuery({ name: 'limit', required: true, type: Number, example: 5 })
  @ApiResponse({
    status: 200,
    description: 'Danh sách category theo giới hạn',
  })
  findLimit(@Query('limit') limit: string) {
    return this.categoryService.findLimit(+limit);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo category mới' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Điện thoại' },
      },
      required: ['name'],
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Tạo category thành công',
  })
  create(@Body() data: { name: string }) {
    return this.categoryService.create(data.name);
  }

  @Put()
  @ApiOperation({ summary: 'Cập nhật category theo id' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '1' },
        name: { type: 'string', example: 'Laptop Gaming' },
      },
      required: ['id', 'name'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật category thành công',
  })
  put(@Body() data: { name: string; id: string }) {
    return this.categoryService.put(data.id, data.name);
  }

  @Delete()
  @ApiOperation({ summary: 'Xoá category theo id' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string', example: '1' },
      },
      required: ['id'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Xoá category thành công',
  })
  deleted(@Body() data: { id: string }) {
    return this.categoryService.delete(data.id);
  }
}
