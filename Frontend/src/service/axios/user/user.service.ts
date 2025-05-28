// user/get/:d

import { axiosWithAuth } from "../axios.config";

export class UserService{
   
 static async getUser(id){
    const response=await axiosWithAuth.get(`user/get/user_2xin2F8nccpfa7UrUdUWVfejQL2`)
    return response.data
 }

    
}

  
export default new UserService();