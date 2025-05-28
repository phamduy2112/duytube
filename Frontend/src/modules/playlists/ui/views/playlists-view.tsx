"use client"
import { Suspense, useEffect, useState } from "react";
import { HomeVideoSection } from "@/modules/home/ui/sections/home-videos-sections";
import { TrendingVideosSection } from "@/modules/home/ui/sections/trending-videos-section";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { PlayListsSection } from "../sections/playlist-section";

interface HomeViewProps{
    categoryId?:string;
}
import { Skeleton } from "@/components/ui/skeleton";

export const PlaylistsHeaderSkeleton = () => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" /> {/* Title skeleton */}
        <Skeleton className="h-4 w-32" /> {/* Description skeleton */}
      </div>
      <Skeleton className="h-10 w-10 rounded-full" /> {/* Plus button skeleton */}
    </div>
  );
};

export const PlayListsView=()=>{
      const [showSkeleton, setShowSkeleton] = useState(true);
 useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 400); // bạn có thể chỉnh 200-500ms tùy ý
    return () => clearTimeout(timer);
  }, []);
    return (
        <div className="w-[350px] sm:w-[600px] md:w-[700px] lg:w-[1000px] xl:w-[1100px] [@media(min-width:1560px)]:w-[1350px]  [@media(min-width:1920px)]:w-[1650px]   mx-auto mb-10 px-4 pt-2.5 flex flex-col gap-y-6">
                {/*  */}
             {
                showSkeleton ?<PlaylistsHeaderSkeleton/> :(
                       <div className="flex justify-between items-center">
  <div>
                <h1 className="text-2xl font-bold">Playlists</h1>
                <p className="text-xs text-muted-foreground">
            Collections you have created
                </p>
             </div>
             <Button
             variant="outline"
             size="icon"
             className="rounded-full"
             >
                <PlusIcon/>
             </Button>
           </div>
                )
             }  
        

           <PlayListsSection showSkeleton={showSkeleton}/>
           
  
              
        </div>
    )
}