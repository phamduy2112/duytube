'use client'

import { useEffect, useState } from "react";
import { InfiniteScroll } from "@/components/infinite-scroll";
import { useIsMobile } from "@/hooks/use-mobile";
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card";
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card";

interface ResultsSectionProps {
  data: any; // bạn nên dùng kiểu rõ ràng hơn nếu có
}

const ResultsSectionSkeleton = () => {
  return (
    <div>
      <div className="hidden flex-col gap-4 md:flex">
        {Array.from({ length: 5 }).map((_, index) => (
          <VideoRowCardSkeleton key={index} />
        ))}
      </div>
      <div className="flex flex-col gap-4 p-4 gap-y-10 pt-6 md:hidden">
        {Array.from({ length: 5 }).map((_, index) => (
          <VideoGridCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export const ResultsSection = ({ data }: ResultsSectionProps) => {
  const isMobile = useIsMobile(); // hook xác định mobile
      const [showSkeleton, setShowSkeleton] = useState(true);
 useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 400); // bạn có thể chỉnh 200-500ms tùy ý
    return () => clearTimeout(timer);
  }, []);
  if (!showSkeleton) {
    return <ResultsSectionSkeleton />; // tránh hydration error
  }

  return (
    <>
      {isMobile ? (
        <div className="flex flex-col gap-4 gap-y-10 md:hidden">
          {data?.data?.map((video:any) => (
            <VideoGridCard key={video.id} data={video} />
          ))}
        </div>
      ) : (
        <div className="hidden flex-col gap-4 md:flex">
          {data?.data?.map((video:any) => (
            <div className="xl:w-[60rem] 2xl:w-[70rem]" key={video.id}>
              <VideoRowCard data={video} size="default" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};
