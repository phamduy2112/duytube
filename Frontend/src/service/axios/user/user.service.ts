// user/get/:d

import { axiosWithAuth } from "../axios.config";

export class UserService{
   
 static async getUser(id){
    const response=await axiosWithAuth.get(`user/get/${id}`)
    return response.data
 }

    
}

  
export default new UserService();