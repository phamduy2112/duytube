import { axiosWithAuth } from "../axios.config";

export class VideoService{
   
    static async getVideo(){
        const response=await axiosWithAuth.get("videos")
        return response.data
    }
    static async getVideoLimit(limit:number){
        try {
            const response=await axiosWithAuth.get(`videos/limit/${limit}`);
        return response.data
        } catch (error) {
            
        }

    }
    static async getVideoDetail(data){
        console.log(data)
        const response=await axiosWithAuth.get(`videos/${data.id}`,
            {
                params: {
                  userId: data.userId, // thay bằng biến userId của bạn
                },
              }
        );
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
    static async toogleReactionsVideo(formData){
        const response=await axiosWithAuth.post("videos/toogle-reactions",formData);
        return response.data;
    }
    static async getLikeCountVideo(id){
        const response=await axiosWithAuth.get(`videos/reactions/${id}`)
        return response.data;
    }


    static async historyVideo(id:string){
        const response=await axiosWithAuth.get(`videos/history/${id}`);
        return response.data
    }
    
    static async getLikeVideoUser(id:string){
        const response=await axiosWithAuth.get(`videos/like/${id}`);
        return response.data
    }

    static async getMyVideoUser(id:string){
        const response=await axiosWithAuth.get(`videos/user/${id}`);
        return response.data
    }

    static async createVideosFormUser(data){
   
        const response=await axiosWithAuth.post("videos",data)
        return response.data; // trả về { video, upload_url }
    }

    static async getVideoDetailStudio(responseData:any){
        const response=await axiosWithAuth.get(`videos/studio/video/${responseData.videoId}`);
            return response.data; // trả về { video, upload_url }
    }

    
}

  
export default new VideoService();