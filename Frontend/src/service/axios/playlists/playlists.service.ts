import { axiosWithAuth } from "../axios.config";

export class PlaylistsService {

  // Tạo playlist mới
  static async createPlaylist(data: {
    title:string,
    description:string,
    user_id:string,
    video_id:string

  }) {
    const response = await axiosWithAuth.post("playlists", data);
    return response.data;
  }

  static async createVideoPaylist(data:{
    video_id:string,
    selected:any[],
  }){
    const response=await axiosWithAuth.post("playlists/create-video",data);
    return response.data
  }

  // Lấy tất cả playlist của 1 user
  static async getUserPlaylists(userId: string) {
    const response = await axiosWithAuth.get(`playlists/user/${userId}`);
    return response.data;
  }
  static async getDetailPlaylists(playlistId: string) {
    const response = await axiosWithAuth.get(`playlists/${playlistId}`);
    return response.data;
  }
}

// Xuất instance duy nhất để dùng ở mọi nơi
export default new PlaylistsService();
