/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { CheckExisting } from 'model/model';
import { ResponseService } from 'model/response';

@Injectable()
export class UserService {
    constructor(
        private prismaService,
        private  responseService:ResponseService,
        private readonly checkUser:CheckExisting,

    ){}
    async getUserDetail(
        id:number
    ){
        this.checkUser.check('users',id,"Không tìm thấy user");
        const resp= this.prismaService.users.findOne({
            where:{
                id,
            }
        })
        return this.responseService.responseSend(resp,"Thành công",200)
    }
    async updateUserDetail(){

    }
    async 
 }
