import { axiosWithAuth } from "../axios.config";

class VideosHistory{

    async getVideosHistory(idUser:any){
        const response = await axiosWithAuth.get("history",idUser);
        return response.data
    }

    async deleteVideosHistory(id:any){
        const response=await axiosWithAuth.delete("history",id);
        return response.data
    }

}

export default new VideosHistory();
