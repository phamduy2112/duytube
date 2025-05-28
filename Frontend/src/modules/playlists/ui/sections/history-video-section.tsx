"use client"

import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card"
import { mockVideos } from "@/scripts/seed-catelogries"
import { VideoService } from "@/service/axios/videos/video"
import { useUser } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"


//  co sus
export const HistoryVideosSectionSekeleton=()=>{
    return     <div>
            <div className="flex flex-col gap-4 gap-y-10 md:hidden">
  {Array.from({length:6}).map((_,index)=>(
                <VideoGridCardSkeleton key={index} />
            ))}
            </div>
            <div className="hidden flex-col gap-4 gap-y-10 md:flex">
  {Array.from({length:6}).map((_,index)=>(
                <VideoRowCardSkeleton key={index}  size="compact"/>
            ))}
            </div>
          
        </div>
}
export const HistoryVideosSection=({statusSubscription})=>{
    return (
        <div>
            <div className="flex flex-col gap-4 gap-y-10 md:hidden">
  {statusSubscription?.map((video)=>(
                <VideoGridCard key={video.id} data={video?.videos}/>
            ))}
            </div>
            <div className="hidden flex-col gap-4 gap-y-10 md:flex">
  {statusSubscription?.map((video)=>(
                <VideoRowCard key={video.id} data={video?.videos} size="default"/>
            ))}
            </div>
          
        </div>
    )
}