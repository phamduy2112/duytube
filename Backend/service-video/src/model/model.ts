import {  ResponseService } from "./response";
import { PrismaClient } from "@prisma/client";
type PrismaModelsWithFindUnique = 'categories' | 'products' | 'users'; // tùy vào schema

export class CheckExisting{
    private prisma = new PrismaClient(); // Khởi tạo Prisma Client
  
    constructor(
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

