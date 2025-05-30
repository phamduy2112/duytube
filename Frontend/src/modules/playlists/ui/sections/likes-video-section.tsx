"use client";

import {
  VideoGridCard,
  VideoGridCardSkeleton,
} from "@/modules/videos/ui/components/video-grid-card";
import {
  VideoRowCard,
  VideoRowCardSkeleton,
} from "@/modules/videos/ui/components/video-row-card";
import { VideoService } from "@/service/axios/videos/video";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";

export const LikedVideosSection = () => {
  const { user, isLoaded } = useUser();

  const {
    data: videoLike,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["liked-video", user?.id],
    queryFn: () => VideoService.getLikeVideoUser(user!.id),
    enabled: isLoaded && !!user?.id,
  });

  const isDataLoading = isLoading || !isLoaded || isFetching;

  if (isDataLoading) {
    return (
      <div>
        <div className="flex flex-col gap-4 gap-y-10 md:hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <VideoGridCardSkeleton key={index} />
          ))}
        </div>
        <div className="hidden flex-col gap-4 gap-y-10 md:flex w-[40rem] my-auto">
          {Array.from({ length: 6 }).map((_, index) => (
            <VideoRowCardSkeleton key={index} size="compact" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-4 gap-y-10 md:hidden">
        {videoLike?.data?.map((video:any) => (
          <VideoGridCard key={video.id} data={video?.videos} />
        ))}
      </div>
      <div className="hidden flex-col gap-4 gap-y-10 md:flex w-[40rem] my-auto">
        {videoLike?.data?.map((video:any) => (
          <VideoRowCard key={video.id} data={video?.videos} size="default" />
        ))}
      </div>
    </div>
  );
};
