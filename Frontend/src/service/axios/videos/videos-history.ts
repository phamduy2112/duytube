import { axiosWithAuth } from "../axios.config";

class VideosHistory{

    async getVideosHistory(idUser:string){
        const response = await axiosWithAuth.get("history",idUser);
        return response.data
    }

    async deleteVideosHistory(id:number){
        const response=await axiosWithAuth.delete("history",id);
        return response.data
    }

}

export default new VideosHistory();
