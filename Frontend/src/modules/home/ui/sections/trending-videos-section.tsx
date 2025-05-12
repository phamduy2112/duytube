"use client"

import { VideoGridCard } from "@/modules/videos/ui/components/video-grid-card"
import { mockVideos } from "@/scripts/seed-catelogries"


//  co sus, co load

export const TrendingVideosSection=()=>{
    return (
        <div>
            <div className="gap-4 gap-y-10 grid grid-cols-1 sm:gird-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
  {mockVideos.map((video)=>(
                <VideoGridCard key={video.id} data={video}/>
            ))}
            </div>
          
        </div>
    )
}