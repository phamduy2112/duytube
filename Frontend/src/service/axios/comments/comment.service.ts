import { ICreateComment, IToogleCommentReactions } from "@/service/type/comments.type";
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
            const response=await axiosWithAuth.get(`/comment/${id}`);
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
    async deleteCommentByUser(idComment:string){
        try {
            const response=await axiosWithAuth.delete(`/comment/${idComment}`)
            return response.data
        } catch (error) {
            
        }
    }

async toogleCommentReactions(formData:IToogleCommentReactions){
    try {
        // dto: {
            // userId,
            // comment_id: string; type: string },
        const response=await axiosWithAuth.post("comment/reactions",formData);
        return response.data;

    } catch (error) {
        
    }

}
 async getReactionsComment(data:{commentId: string, clerk_user_id: string}){
    const response=await axiosWithAuth.get(`comment/${data.commentId}/reaction`,{ params: {
          clerk_user_id:data.clerk_user_id, // query param
        },})
              return response.data;

}
async getCommentReactions(id:string){
    const response=await axiosWithAuth.get(`comment/count/${id}`);
    return response.data;
}
async deleteCommentReactions(id:number){
    
}
}

export default new CommentService();