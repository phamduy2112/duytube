import { axiosWithAuth } from "../axios.config";

export class NotificationoService{
   
    static async getNotification(id:string){
        const response=await axiosWithAuth.get(`notification/${id}`)
        return response.data
    }
       static async createNotification(formData:any){
        const response=await axiosWithAuth.post("notification",formData);
        return response.data;
    }
  

    
}

  
export default new NotificationoService();