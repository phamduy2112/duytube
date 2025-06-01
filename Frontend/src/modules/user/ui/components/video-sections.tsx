import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card";
import UserVideo from "./user-video";
import VideoOfUser from "@/components/video-of-user";

interface VideosVideosSectionProps {
  activeItem: string;
  userDetail?: {
    videos?: any[];
  };
  isLoading:boolean
}

export const VideosVideoSection = ({ activeItem, userDetail,isLoading }: VideosVideosSectionProps) => {
  const videos = userDetail?.videos ?? [];
  
  return (
    <div>
      {activeItem === "Trang chủ" ? (
        <div className="relative 2xl:w-[1600px]">
          {videos.length > 0 ? (
            <>
          
            {/* videos,className,isloading,title */}
            <VideoOfUser title={"Dành cho bạn"} videos={videos} isLoading={isLoading} className={"pl-2 basis-1/2 lg:basis-1/3 xl:basis-1/4"}/>
            <VideoOfUser title={"Video pho bien"} videos={videos} isLoading={isLoading} className={"gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"}/>
            <VideoOfUser title={"Video"} videos={videos} isLoading={isLoading} className={"gap-4 gap-y-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"}/>
            </>
          ) : (
            <div>Chưa có video</div>
          )}
  
        </div>
        
      ) : (
        <UserVideo videos={videos}/>
      )}
    </div>
  );
};
