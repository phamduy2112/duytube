import { InfiniteScroll } from "@/components/infinite-scroll";
import { useIsMobile } from "@/hooks/use-mobile";
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card";
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card";
import { mockVideos } from "@/scripts/seed-catelogries";
import { VideoService } from "@/service/axios/videos/video";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

interface ResultsSectionProps{
   data:any[]
}

const ResultsSectionSkeleton=()=>{
    return (
        <div>
            <div className="hidden flex-col gap-4 md:flex">
                {Array.from({length:5}).map((_,index)=>(
                    <VideoRowCardSkeleton key={index}/>
                ))}
            </div>
            <div className="flex flex-col gap-4 p-4 gap-y-10 pt-6 md:hidden">
            {Array.from({length:5}).map((_,index)=>(
                    <VideoGridCardSkeleton key={index}/>
                ))}
            </div>
        </div>
    )
}

export const ResultsSection=({
  data
}:ResultsSectionProps)=>{

    const isMobile=useIsMobile();
  
    
        
        
        
    return (
        <>
        {isMobile?(
            <div className="flex flex-col gap-4 gap-y-10 md:hidden">
                { data.map((video)=>(
                    <VideoGridCard key={video.id} data={video}/>
                ))}
            </div>
        ):(
            <div className="hidden flex-col gap-4 md:flex">
                {
                     data.map((video)=>(
                        <div className="xl:w-[60rem] 2xl:w-[70rem]" key={video.id} >

<VideoRowCard data={video} size="default"/>
                        </div>
                    ))
                }
            </div>
        )}
        {/* <InfiniteScroll
        hasNextPage={resultsQuery.hasNextPage}
        isFetchingNextPage={resultsQuery.isFetchingNextPage}
        fetchNextPage={resultsQuery.fetchNextPage}
        
        /> */}
        </>
    )
}