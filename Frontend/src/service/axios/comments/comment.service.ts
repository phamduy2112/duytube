import { axiosWithAuth } from "../axios.config";

class CommentService{
    async createComment(dataForm:ICreateComment)
    {
        try {
            const response=await axiosWithAuth.post("/comment",dataForm);
            return response.data

        } catch (error) {
            
        }     
    }
    async getCommentByVideo(id:number){

        try {
            const response=await axiosWithAuth.get(`/comment-by-video/${id}`);
            return response.data;
        } catch (error) {
            
        }

    }
    async putCommentByUser(idComment:number,data:any){
        try {
            const response=await axiosWithAuth.put(`/comment/${idComment}`,data)
            return response.data
        } catch (error) {
            
        }
    }
    async deleteCommentByUser(idComment:number){
        try {
            const response=await axiosWithAuth.delete(`/comment/${idComment}`)
            return response.data
        } catch (error) {
            
        }
    }
}

export default new CommentService();