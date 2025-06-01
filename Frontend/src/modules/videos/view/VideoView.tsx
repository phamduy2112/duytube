'use client'


import { mockVideos } from "@/scripts/seed-catelogries";
import {SuggestionsSection, SuggestionsSectionSkeleton} from "../sections/suggestions-sections";
import CommentsSection from "../sections/comments-section";
import { useQuery } from "@tanstack/react-query";
import { VideoService } from "@/service/axios/videos/video";
import { VideoSectionSekeleton, VideoSectionSuspense } from "../sections/video-section";
import { useDelayedSkeleton } from "@/hooks/use-delayed-skeleton";

interface VideoViewProps{
    videoId:string;
}
const VideoViewSkeleton=()=>{
    return (
          <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 min-w-0 ">
                    
                     <VideoSectionSekeleton/>
                    <div className="xl:hidden block mt-4">
                            {/* <SuggestionsSection videoId={videoId} isManual/> */}
                            <SuggestionsSectionSkeleton/>
                    </div>
                </div>
                <div className="hidden xl:block w-full xl:w-[380px] 2xl:w-[460px] shrink-1">
                    {/* <SuggestionsSection videoId={videoId}/> */}
                    <SuggestionsSectionSkeleton/>
                </div>
            </div>
    )
}

export const VideoView=({videoId}:VideoViewProps)=>{
     const showSkeleton = useDelayedSkeleton(500); // có thể bỏ 500 nếu bạn dùng default

    return (
        <div className="flex flex-col 2xl:w-[1650px] mx-auto pt-2.5 px-4 mb-10">
            {showSkeleton ?(<VideoViewSkeleton/>) :(            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 min-w-0 ">
                    <VideoSectionSuspense videoId={videoId}/>
                    
                    <div className="xl:hidden block mt-4">
                            <SuggestionsSection videoId={videoId} isManual/>
                            {/* <SuggestionsSectionSkeleton/> */}
                    </div>
                </div>
                <div className="hidden xl:block w-full xl:w-[380px] 2xl:w-[460px] shrink-1">
                    <SuggestionsSection videoId={videoId}/>
                    {/* <SuggestionsSectionSkeleton/> */}
                </div>
            </div>)}

        </div>
    )
}