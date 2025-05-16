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
    // 
    // CREATE TABLE comment_reactions (
//     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
//     user_id UUID NOT NULL,
//     comment_id UUID NOT NULL,
//     type TEXT NOT NULL,
//     created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
//     updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
//     CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
//     CONSTRAINT fk_comment FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
//     CONSTRAINT unique_user_comment UNIQUE (user_id, comment_id)
// );
async createCommentReactions(formData){
    try {
        const response=await axiosWithAuth.post("comment-reactions",formData);
        return response.data;

    } catch (error) {
        
    }

}
async getCommentReactions(){

}
async deleteCommentReactions(id:number){
    
}
}

export default new CommentService();