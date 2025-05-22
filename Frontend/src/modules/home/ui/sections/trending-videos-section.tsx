"use client"

import { VideoGridCard } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard } from "@/modules/videos/ui/components/video-row-card"
import { mockVideos } from "@/scripts/seed-catelogries"


//  co sus, co load

export const TrendingVideosSection=()=>{
    return (
        <div>
          <div className="flex flex-col gap-4 gap-y-10 md:hidden">
  {mockVideos?.map((video)=>(
                <VideoGridCard key={video.id} data={video?.videos}/>
            ))}
            </div>
            <div className="hidden flex-col gap-4 gap-y-10 md:flex">
  {mockVideos?.map((video)=>(
                <VideoRowCard key={video.id} data={video?.videos} size="default"/>
            ))}
            </div>
          
        </div>
    )
}