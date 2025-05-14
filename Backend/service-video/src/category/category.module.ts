import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { ResponseModule } from 'src/model/response.module';

@Module({
  imports:[ResponseModule],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
