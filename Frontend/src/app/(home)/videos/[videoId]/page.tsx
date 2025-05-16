import { FormSectionSuspense } from "@/app/(studio)/studio/ui/sections/form-section";
import { CommentForm } from "@/modules/comments/ui/components/comment-form";
import { CommentItem } from "@/modules/comments/ui/components/comment-items";
import { VideosSection } from "@/modules/studio/ui/sections/videos-section";
import { SubscriptionsSection } from "@/modules/subscriptions/ui/sections/subscription-sections";
import { VideoSectionSuspense } from "@/modules/videos/sections/video-section";
import { VideoBanner } from "@/modules/videos/ui/components/video-banner";
import { VideoInfo, VideoInfoSkeleton } from "@/modules/videos/ui/components/video-info";
import { VideoOwner } from "@/modules/videos/ui/components/video-owner";
import { VideoPlayer } from "@/modules/videos/ui/components/video-player";
import { VideoView } from "@/modules/videos/view/VideoView";
import { mockComments, mockVideos } from "@/scripts/seed-catelogries";
export const dynamic="force-dynamic";

interface PageProps {
    params: { videoId: string };
  }
  
const Page = async ({ params }: PageProps) => {
  const { videoId } = params; // ✅ sử dụng được trong hàm async
      const videoDetail = mockVideos.find((item) => item.id === String(videoId));
    
      if (!videoDetail) {
        return <div>Không tìm thấy video.</div>;
      }
    
    return(
        <div className="pt-16">
            {videoId}
            {/* <FormSectionSuspense videoId={videoId} /> */}

             <div>
                  {/* <h2>{videoDetail.title}</h2>
                  <p>{videoDetail.description}</p>
                  <video controls width="640">
                    <source src={videoDetail.url} type="video/mp4" />
                    Trình duyệt của bạn không hỗ trợ video.
                  </video>
             
                 <VideoSectionSuspense videoId={videoDetail.id}/>
             */}
            <VideoView videoId={videoDetail.id}/>     
                </div>
        </div>
    )

}
export default Page