interface IComments{
    id:string;
    parent:string;
    user_id:string;
    video_id:string;
    value:string;

}

export interface ICreateComment{
    parent:string;
    user_id:string;
    video_id:string;
    value:string;
}

export interface IToogleCommentReactions{
    userId:string,
    comment_id:string;
    type:"like"|"unlike";
}

export interface ICommentReactions{
    commentId:string;
    clerk_user_id:string;
}