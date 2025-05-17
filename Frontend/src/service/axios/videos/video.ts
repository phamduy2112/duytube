import { axiosWithAuth } from "../axios.config";

export class VideoService{
   
    static async getVideo(){
        const response=await axiosWithAuth.get("videos")
        return response.data
    }
    async getVideoDetail(id){
        const response=await axiosWithAuth.get(`videos/${id}`);
        return response.data
    }
    async getVideoTrending(id){
        const response=await axiosWithAuth.get('videos/trending');
        return response.data
    }
    async searchVideo(name:string){
        const response=await axiosWithAuth.get("search-videos",name)
        return response.data
    }
    

}

export default new VideoService();