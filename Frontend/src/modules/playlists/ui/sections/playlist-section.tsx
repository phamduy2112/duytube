"use client"

import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card"
import { mockPlaylists, mockVideos } from "@/scripts/seed-catelogries"
import { PlayListGridCard } from "../components/playlist-grid-card"


//  co sus
const PlayListsSectionSekeleton=()=>{
    return     <div>
            <div className="flex flex-col gap-4 gap-y-10 md:hidden">
  {Array.from({length:18}).map((_,index)=>(
                <VideoGridCardSkeleton key={index} />
            ))}
            </div>
            <div className="hidden flex-col gap-4 gap-y-10 md:flex">
  {Array.from({length:18}).map((_,index)=>(
                <VideoRowCardSkeleton key={index}  size="compact"/>
            ))}
            </div>
          
        </div>
}
export const PlayListsSection=()=>{
    return (
        <div>
            <div className="gap-4 gap-y-10 grid grid-cols-1 sm:gird-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4
            [@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px):grid-cols-6]">

                    {mockPlaylists.map((item)=>(
                        <PlayListGridCard
                        key={item.id}
                        data={item}
                        />
                    ))}
            </div>
          
        </div>
    )
}