import { axiosWithAuth } from "../axios.config";

export class NotificationoService{
   
    static async getNotification(){
        const response=await axiosWithAuth.get("notification")
        return response.data
    }
       static async createNotification(formData:any){
        const response=await axiosWithAuth.post("notification",formData);
        return response.data;
    }
  

    
}

  
export default new NotificationoService();