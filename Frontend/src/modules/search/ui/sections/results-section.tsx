import { InfiniteScroll } from "@/components/infinite-scroll";
import { useIsMobile } from "@/hooks/use-mobile";
import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card";
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card";
import { mockVideos } from "@/scripts/seed-catelogries";

interface ResultsSectionProps{
    query:string|undefined;
    categoryId:string|undefined;
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
    query,
    categoryId,
}:ResultsSectionProps)=>{

    const isMobile=useIsMobile();
    const results=[{}]
    return (
        <>
        {isMobile?(
            <div className="flex flex-col gap-4 gap-y-10 md:hidden">
                {results.map((video)=>(
                    <VideoGridCard key={video.id} data={video}/>
                ))}
            </div>
        ):(
            <div className="hidden flex-col gap-4 md:flex">
                {
                    mockVideos.map((video)=>(
                        <VideoRowCard key={video.id} data={video} size="default"/>
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