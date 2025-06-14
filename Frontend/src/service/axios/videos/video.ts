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
     static async getReactionsVideos(data:{videoId: string, clerk_user_id: string}){
    const response=await axiosWithAuth.get(`videos/${data.videoId}/reaction`,{ params: {
          clerk_user_id:data.clerk_user_id, // query param
        },})
              return response.data;

}
    static async getVideoDetail(data:any){
        const response=await axiosWithAuth.get(`videos/${data.id}`,
            {
                params: {
                  userId: data.userId, // thay bằng biến userId của bạn
                },
              }
        );
        return response.data
    }
    static async updateVideoDetail(data:any){
        const response=await axiosWithAuth.put(`videos/${data.id}`,data);
        return response.data
    }
   static async getVideoTrending(){
        const response=await axiosWithAuth.get('videos/trending');
        return response.data
    }
    static async searchVideo(keyword:string){
        const response=await axiosWithAuth.get("videos/search", {
            params: { keyword },
          });
        return response.data
    }
    static async toogleReactionsVideo(formData:any){
        const response=await axiosWithAuth.post("videos/toogle-reactions",formData);
        return response.data;
    }
    static async getLikeCountVideo(id:string){
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

    static async createVideosFormUser(data:any){
   
        const response=await axiosWithAuth.post("videos",data)
        return response.data; // trả về { video, upload_url }
    }

    static async getVideoDetailStudio(responseData:any){
        const response=await axiosWithAuth.get(`videos/studio/video/${responseData.videoId}`);
            return response.data; // trả về { video, upload_url }
    }

    static async deleteLikeVideo(data:{videoId: string, userId: string}){
        const response=await axiosWithAuth.delete(`videos/remove-like-video/${data.videoId}?clerk_user_id=${data.userId}`);
        return response;
    }
    static async deleteHistoryVideos(id:string){
        const response=await axiosWithAuth.delete(`videos/history/all/${id}`);
        return response;
    }
    static async deleteVideoHistory(data:{videoId: string, userId: string}) {
        const response = await axiosWithAuth.delete(
          `videos/history/${data.videoId}?clerk_user_id=${data.userId}`
        );
        return response;
      }
      static async deletePlaylist(id:string){
        const response=await axiosWithAuth.delete(`videos/history/all/${id}`);
        return response;
    }
    
}

  
export default new VideoService();