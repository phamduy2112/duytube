import { axiosWithAuth } from "../axios.config"

export class AuthService{
    async createUser(data:any){
        const response=await axiosWithAuth("videos/user",data)
        return response.data
    }
}

export default new AuthService()