


import { mockVideos } from "@/scripts/seed-catelogries";
import {SuggestionsSection} from "../sections/suggestions-sections";
import  { VideoSectionSuspense } from "../sections/video-section";
import CommentsSection from "../sections/comments-section";

interface VideoViewProps{
    id:String;
}

export const VideoView=({videoId}:VideoViewProps)=>{
    
    return (
        <div className="flex flex-col w-[1650px] mx-auto pt-2.5 px-4 mb-10">
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="flex-1 min-w-0 mt-[3rem]">
                    <VideoSectionSuspense videoId={videoId}/>
                    <div className="xl:hidden block mt-4">
                            <SuggestionsSection videoId={videoId} isManual/>
                    </div>
                    <CommentsSection/>
                </div>
                <div className="hidden xl:block w-full xl:w-[380px] 2xl:w-[460px] shrink-1">
                    <SuggestionsSection videoId={videoId}/>
                </div>
            </div>
        </div>
    )
}