import { UserModule } from './../user/user.module';
import { UserController } from './../user/user.controller';
import { UserService } from '../user/user.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    UserModule,],
  controllers: [
    UserController, AppController],
  providers: [
    UserService, AppService],
})
export class AppModule { }
