"use client"
import React, { Suspense } from 'react'
import { VideoRowCard, VideoRowCardSkeleton } from '../ui/components/video-row-card'
import { InfiniteScroll } from '@/components/infinite-scroll'
import { VideoGridCardSkeleton } from '../ui/components/video-grid-card';
import { mockVideos } from '@/scripts/seed-catelogries';
import { useQuery } from '@tanstack/react-query';
import { VideoService } from '@/service/axios/videos/video';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface SuggestionsSectionProps{
    videoId:string;
    isManual?:boolean
}

export const SuggestionsSection=({
    videoId,
    isManual
}:SuggestionsSectionProps)=>{
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <SuggestionsSectionSuspense videoId={videoId} isManual={isManual}/>
        </Suspense>
    )
}

export const SuggestionsSectionSkeleton=()=>{
    return (

        <>
           <div className="flex gap-[.5rem] mb-3">
          <Skeleton className="h-10 w-[80px]" />
          <Skeleton className="h-10 w-[120px]" />
          <Skeleton className="h-10 w-[80px]" />
        </div>
        <div className='hidden md:block space-y-3'>
            {Array.from({length:8}).map((_,index)=>(
                <VideoRowCardSkeleton key={index} size="compact"/>
            ))}
        </div>
        <div className='block md:hidden space-y-10'>
            {Array.from({length:8}).map((_,index)=>(
                <VideoGridCardSkeleton key={index}/>
            ))}
        </div>
        </>
    )
}

function SuggestionsSectionSuspense({
    videoId,
    isManual
}:SuggestionsSectionProps) {
const suggestedVideos = mockVideos.filter((item) => item.id !== String(videoId));
// getVideoLimit
   const {data:videoLimit}=useQuery({
        queryKey:['video_limit',10],
        queryFn: ()=> VideoService.getVideoLimit(10)
    })
  return (
  <>
    <div className='hidden md:block space-y-3'>
        <div className='flex gap-[.5rem]'>
            <Button>
                Tat ca
            </Button>
            <Button variant={"outline"}>
                Video vua xem
            </Button>
            <Button variant={"outline"}>
                Da xem
            </Button>
           
        </div>
    {videoLimit?.data?.map((video:any) => {
 return <VideoRowCard
    key={video.id}
    data={video}
    size="compact"
  />
})}

    </div>
    <div className='block md:hidden space-y-10'>
           <div className='flex gap-[.5rem]'>
            <Button>
                Tat ca
            </Button>
            <Button variant={"outline"}>
                Video vua xem
            </Button>
            <Button variant={"outline"}>
                Da xem
            </Button>
           
        </div>
        {videoLimit?.data?.map((video:any) => {
  return (
    <VideoRowCard
      key={video.id}
      data={video}
      size="compact"
    />
  );
})}

    </div>
    {/* <InfiniteScroll
    isManual={isManual}
    hasNextPage={query.hasNextPage}
    isFetchingNextPage={query.isFetchingNextPage}
    fetchNextPage={query.fetchNextPage}
    /> */}
  </>
  )
}

export default SuggestionsSection