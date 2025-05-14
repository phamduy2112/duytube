// src/prisma/prisma.service.ts
import * as dotenv from 'dotenv';
dotenv.config(); // Chỉ ở đây mới dùng!

import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Connected to Prisma DB');
  }
}
