import { mockComments, mockVideos } from "@/scripts/seed-catelogries";
import { VideoBanner } from "../ui/components/video-banner";
import { VideoPlayer, VideoPlayerSkeleton } from "../ui/components/video-player";
import { Suspense } from "react";
import { VideoTopRow, VideoTopRowSkeleton } from "../ui/components/video-top-row";
import { CommentForm, CommentFormSkeleton } from "@/modules/comments/ui/components/comment-form";
import { CommentItem, CommentItemSkeleton } from "@/modules/comments/ui/components/comment-items";
import { VideoService } from "@/service/axios/videos/video";
import { useQuery } from "@tanstack/react-query";
import commentService from "@/service/axios/comments/comment.service";
import { useUser } from "@clerk/nextjs";
import { RequireLoginWrapper } from "@/components/require-login";
import { Skeleton } from "@/components/ui/skeleton";

// export const VideoSection=({videoId}:any)=>{
//   return (
//     <Suspense fallback={<VideoSectionSekeleton />}>
//       <VideoSectionSuspense videoId={videoId}/>
//     </Suspense>
//   )
// }
export const VideoSectionSekeleton=()=>{
  return (
    <>
    <VideoPlayerSkeleton/>
    <VideoTopRowSkeleton/>
      <div>
     <Skeleton className="h-8 w-80 mb-3"/>
    <RequireLoginWrapper>
   <CommentFormSkeleton />
    </RequireLoginWrapper>
<div className="mt-[1rem]">

</div>
   
  </div>
    </>
  )
}
export const VideoSectionSuspense = ({ videoId }:any) => {
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
   
  return (
    <div>
   
    <VideoPlayer autoPlay playBackId={videoDetail?.data?.mux_playback_id}></VideoPlayer>
    <VideoTopRow video={videoDetail}/>
  <div>
      <p className="font-bold text-[1.2rem] py-3">
       {comment?.data?.length} Comments
    </p>
    <RequireLoginWrapper>
   <CommentForm videoId={response.id} ownerId={videoDetail?.data?.user_id} />
    </RequireLoginWrapper>
   
  </div>
    {
  comment?.data?.map((item:any) => {
    return <CommentItem key={item.id} comment={item} variant={"comment"} />;
  })
}

     
    </div>
  );
};

