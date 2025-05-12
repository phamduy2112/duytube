"use client"

import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card"
import { mockVideos } from "@/scripts/seed-catelogries"


//  co sus
// const HistoryVideosSectionSekeleton=()=>{
//     return     <div>
//             <div className="flex flex-col gap-4 gap-y-10 md:hidden">
//   {Array.from({length:18}).map((_,index)=>(
//                 <VideoGridCardSkeleton key={index} />
//             ))}
//             </div>
//             <div className="hidden flex-col gap-4 gap-y-10 md:flex">
//   {Array.from({length:18}).map((_,index)=>(
//                 <VideoRowCardSkeleton key={index}  size="compact"/>
//             ))}
//             </div>
          
//         </div>
// }
export const LikedVideosSection=()=>{
    return (
        <div>
            <div className="flex flex-col gap-4 gap-y-10 md:hidden">
  {mockVideos.map((video)=>(
                <VideoGridCard key={video.id} data={video}/>
            ))}
            </div>
            <div className="hidden flex-col gap-4 gap-y-10 md:flex">
  {mockVideos.map((video)=>(
                <VideoRowCard key={video.id} data={video} size="default"/>
            ))}
            </div>
          
        </div>
    )
}