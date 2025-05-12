import React, { Suspense } from 'react'
import { VideoRowCard, VideoRowCardSkeleton } from '../ui/components/video-row-card'
import { InfiniteScroll } from '@/components/infinite-scroll'
import { VideoGridCardSkeleton } from '../ui/components/video-grid-card';

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

const SuggestionsSectionSkeleton=()=>{
    return (

        <>
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
  return (
  <>
    <div className='hidden md:block space-x-3'>
        {Array(5).map((video)=>{
            <VideoRowCard
            key={video.id}
            data={video}
            size="compact"
            ></VideoRowCard>
        })}
    </div>
    <div className='block md:hidden space-y-10'>
        {Array(5).map((video)=>{
            <VideoRowCard
            key={video.id}
            data={video}
            size="compact"
            ></VideoRowCard>
        })}
    </div>
    <InfiniteScroll
    isManual={isManual}
    hasNextPage={query.hasNextPage}
    isFetchingNextPage={query.isFetchingNextPage}
    fetchNextPage={query.fetchNextPage}
    />
  </>
  )
}

export default SuggestionsSection