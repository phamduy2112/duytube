import axios from "axios";
import { axiosWithAuth } from "../axios.config"

export class SubscriptionsService{

    static async toggleSubscriptions(data:any){
        // viewerId,creatorId
        const response=await axiosWithAuth.post("subscripe",data);
        return response.data
    }
    static async findMySubscriptions(viewerId:string){
        const response=await axiosWithAuth.get("subscripe/get",{
            params:{
                viewerId
            }
        }
        )
    return response.data
    }
    static async findYourSubscriptions(creatorId:string){
        const response=await axiosWithAuth.get("subscripe/get-my",{
            params:{
                creatorId
            }
        }
        )
    return response.data
    }
    // status
    static async StatusSubscriptions(viewerId:string,creatorId:string){
        const response=await axiosWithAuth.get("subscripe/status",{
            params:{
                viewerId,creatorId
            }
        }
        )
    return response.data
    }
}

export default new SubscriptionsService()