'use client'

import { Suspense, useEffect, useState } from "react";
import { HomeVideoSection } from "@/modules/home/ui/sections/home-videos-sections";
import { TrendingVideosSection } from "@/modules/home/ui/sections/trending-videos-section";
import { LikedVideosSection } from "../sections/likes-video-section";
import { Skeleton } from "@/components/ui/skeleton";

interface HomeViewProps{
    categoryId?:string;
}export const LikedHeaderSkeleton = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" /> {/* Title skeleton */}
        <Skeleton className="h-4 w-32" /> {/* Description skeleton */}
      </div>
    </div>
  );
};

export const LikedgView=()=>{
          const [showSkeleton, setShowSkeleton] = useState(true);
     useEffect(() => {
        const timer = setTimeout(() => {
          setShowSkeleton(false);
        }, 400); // bạn có thể chỉnh 200-500ms tùy ý
        return () => clearTimeout(timer);
      }, []);
    return (
        <div className="max-w-screen-lg mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
                {/*  */}
               {
                showSkeleton ? <LikedHeaderSkeleton/>:  <div>
                <h1 className="text-2xl font-bold">Video likes</h1>
                <p className="text-xs text-muted-foreground">
            Videos you have liked
                </p>
             </div>
               }
            
        <LikedVideosSection/>
              
        </div>
    )
}