interface IComments{
    id:string;
    parent:string;
    user_id:string;
    video_id:string;
    value:string;

}

interface ICreateComment{
    parent:string;
    user_id:string;
    video_id:string;
    value:string;
}
