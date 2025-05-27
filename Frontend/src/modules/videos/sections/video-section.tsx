import { mockComments, mockVideos } from "@/scripts/seed-catelogries";
import { VideoBanner } from "../ui/components/video-banner";
import { VideoPlayer, VideoPlayerSkeleton } from "../ui/components/video-player";
import { Suspense } from "react";
import { VideoTopRow, VideoTopRowSkeleton } from "../ui/components/video-top-row";
import { CommentForm } from "@/modules/comments/ui/components/comment-form";
import { CommentItem } from "@/modules/comments/ui/components/comment-items";
import { VideoService } from "@/service/axios/videos/video";
import { useQuery } from "@tanstack/react-query";
import commentService from "@/service/axios/comments/comment.service";
import { useUser } from "@clerk/nextjs";
import { RequireLoginWrapper } from "@/components/require-login";

export const videoSection=({videoId})=>{
  return (
    <Suspense fallback={<VideoSectionSuspense/>}>
      <VideoSectionSuspense videoId={videoId}/>
    </Suspense>
  )
}
const VideoSectionSekeleton=()=>{
  return (
    <>
    <VideoPlayerSkeleton/>
    <VideoTopRowSkeleton/>
    </>
  )
}
export const VideoSectionSuspense = ({ videoId }) => {
    const { user } = useUser();
 const response={
        id:videoId,
        userId:user?.id,
        
    }
   
     const {data:videoDetail,error}=useQuery({
                queryKey:["videoDetail",response.id],
                queryFn:()=>VideoService.getVideoDetail(response),
                enabled:!!response.id,
            })
            const {data:comment}=useQuery({
              queryKey:["commentDetail",response.id],
              queryFn:()=>commentService.getCommentByVideo(response.id),
              enabled:!!response.id,
          })    
     console.log(comment)
      
  return (
    <div>
   
    <VideoPlayer autoPlay playBackId="" thumbnaiUrl=""></VideoPlayer>
    <VideoTopRow video={videoDetail}/>
  <div>
      <p className="font-bold text-[1.2rem] py-3">
       {comment?.data?.length} Comments
    </p>
    <RequireLoginWrapper>
   <CommentForm videoId={response.id} />
    </RequireLoginWrapper>
   
  </div>
    {
  comment?.data?.map((item) => {
    return <CommentItem key={item.id} comment={item} />;
  })
}

     
    </div>
  );
};

