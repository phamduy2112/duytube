import { axiosWithAuth } from "../axios.config";

export class VideoService{
   
    static async getVideo(){
        const response=await axiosWithAuth.get("videos")
        return response.data
    }
    static async getVideoDetail(data){
        const response=await axiosWithAuth.get(`videos/${data.id}`,data.userId);
        return response.data
    }
    async getVideoTrending(id){
        const response=await axiosWithAuth.get('videos/trending');
        return response.data
    }
    static async searchVideo(keyword:string){
        const response=await axiosWithAuth.get("videos/search", {
            params: { keyword },
          });
        return response.data
    }
    

}

  
export default new VideoService();