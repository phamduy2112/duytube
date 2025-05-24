import { axiosWithAuth } from "../axios.config"

export class AuthService{
  
    static async createUser(data:any){
        const response=await axiosWithAuth.post("clerk/webhook",data)
        return response.data
    }
    static async getUser(data:any){
        const response=await axiosWithAuth.get("webhook",data)
        return response.data
    }
}

export default new AuthService()