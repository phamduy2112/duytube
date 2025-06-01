"use client"

import { VideoGridCard } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard } from "@/modules/videos/ui/components/video-row-card"
import { mockVideos } from "@/scripts/seed-catelogries"


//  co sus, co load

export const TrendingVideosSection=({data}:any)=>{
    return (
        <div>
          <div className="flex flex-col gap-4 gap-y-10 md:hidden">
  {data?.map((video:any)=>(
                <VideoGridCard key={video.id} data={video}/>
            ))}
            </div>
            <div className="hidden flex-col gap-4 gap-y-10 md:flex">
  {data?.map((video:any)=>(
                <VideoRowCard key={video.id} data={video} size="default"/>
            ))}
            </div>
          
        </div>
    )
}