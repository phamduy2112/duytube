import { PrismaService } from "src/prisma/prisma.service";
import {  ResponseService } from "./response";
type PrismaModelsWithFindUnique = 'categories' | 'products' | 'users'; // tùy vào schema

export class CheckExisting{
    constructor(
        private prisma: PrismaService,
        private readonly response: ResponseService

      ) {}
      
      async check(model: PrismaModelsWithFindUnique, id: number, errorMessage: string) {
        const repo = this.prisma[model] as any; // ép kiểu để dùng được findUnique
        const existing = await repo.findUnique({
          where: { id },
        });
      
        if (!existing) {
          return this.response.responseSend(null, errorMessage, 400);
        }
      
        return existing;
      }
      }

