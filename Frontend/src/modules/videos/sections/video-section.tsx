import { mockVideos } from "@/scripts/seed-catelogries";
import { VideoBanner } from "../ui/components/video-banner";
import { VideoPlayer, VideoPlayerSkeleton } from "../ui/components/video-player";
import { Suspense } from "react";
import { VideoTopRowSkeleton } from "../ui/components/video-top-row";

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
const VideoSectionSuspense = ({ videoId }) => {
  const videoDetail = mockVideos.find((item) => item.id === String(videoId));

  if (!videoDetail) {
    return <div>Không tìm thấy video.</div>;
  }



  return (
    <div>
      <h2>{videoDetail.title}</h2>
      <p>{videoDetail.description}</p>
      <video controls width="640">
        <source src={videoDetail.url} type="video/mp4" />
        Trình duyệt của bạn không hỗ trợ video.
      </video>
      <p>Thể loại: {videoDetail.category}</p>
      <p>Lượt xem: {videoDetail.views}</p>
      <p>Hiển thị: {videoDetail.visibility}</p>
      <VideoPlayer autoPlay onPlay={()=>{}} playBackId="" thumbnaiUrl=""></VideoPlayer>
      <VideoBanner status=""></VideoBanner>
    </div>
  );
};

