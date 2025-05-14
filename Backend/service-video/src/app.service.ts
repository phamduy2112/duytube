import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'generated/prisma';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private readonly prisma:PrismaService
  ){}
  async getHello() {
    // return await this.prisma.category.findMany();
  }
}
