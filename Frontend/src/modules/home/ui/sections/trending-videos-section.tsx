"use client"

import { VideoGridCard } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard } from "@/modules/videos/ui/components/video-row-card"
import { mockVideos } from "@/scripts/seed-catelogries"


//  co sus, co load

export const TrendingVideosSection=()=>{
    return (
        <div>
            <div className="flex flex-col gap-y-5">
  {mockVideos.map((video)=>(
                <VideoRowCard key={video.id} data={video}/>
            ))}
            </div>
          
        </div>
    )
}