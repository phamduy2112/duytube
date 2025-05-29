import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { VideoGridCard } from "@/modules/videos/ui/components/video-grid-card";
import UserVideo from "./user-video";

interface VideosVideosSectionProps {
  activeItem: string;
  userDetail?: {
    videos?: any[];
  };
}

export const VideosVideoSection = ({ activeItem, userDetail }: VideosVideosSectionProps) => {
  const videos = userDetail?.videos ?? [];

  return (
    <div>
      {activeItem === "Trang chủ" ? (
        <div className="relative 2xl:w-[1600px]">
          {videos.length > 0 ? (
            <>
              <h3 className="py-4 font-bold text-lg">Dành cho bạn</h3>
              <Carousel className="w-full">
                <CarouselContent className="-ml-2">
                  {videos.map((video) => (
                    <CarouselItem
                      key={video.id}
                      className="pl-2 basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                      <VideoGridCard data={video} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="cursor-pointer absolute left-0 top-[33%] -translate-y-1/2 z-10" />
                <CarouselNext className="cursor-pointer absolute right-0 top-[33%] -translate-y-1/2 z-10" />
              </Carousel>
            </>
          ) : (
            <div>Chưa có video</div>
          )}
        </div>
      ) : (
        <UserVideo />
      )}
    </div>
  );
};
