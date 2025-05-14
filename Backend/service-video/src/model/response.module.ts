import { Module } from "@nestjs/common";
import { ResponseService } from "./response";

@Module({
    providers: [ResponseService],
    exports: [ResponseService], // cần thiết nếu muốn dùng ở module khác
  })
  export class ResponseModule {}
  