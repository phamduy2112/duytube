import { mockComments, mockVideos } from "@/scripts/seed-catelogries";
import { VideoBanner } from "../ui/components/video-banner";
import { VideoPlayer, VideoPlayerSkeleton } from "../ui/components/video-player";
import { Suspense } from "react";
import { VideoTopRow, VideoTopRowSkeleton } from "../ui/components/video-top-row";
import { CommentForm } from "@/modules/comments/ui/components/comment-form";
import { CommentItem } from "@/modules/comments/ui/components/comment-items";

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
  const videoDetail = mockVideos.find((item) => item.id === String(videoId));

  if (!videoDetail) {
    return <div>Không tìm thấy video.</div>;
  }
  console.log(videoDetail)


  return (
    <div>
   
      <VideoPlayer autoPlay playBackId="" thumbnaiUrl=""></VideoPlayer>
    <VideoTopRow video={videoDetail}/>
  <div>
      <p className="font-bold text-[1.2rem] py-3">
      136 Comments
    </p>
      <CommentForm/>
  </div>
    {
  mockComments.map((item) => {
    return <CommentItem key={item.id} comment={item} />;
  })
}

     
    </div>
  );
};

