"use client"

import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card"
import { mockVideos } from "@/scripts/seed-catelogries"
import { VideoService } from "@/service/axios/videos/video"
import { useClerk, useUser } from "@clerk/nextjs"
import { useQuery } from "@tanstack/react-query"


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
    const {user}=useUser()
    const {data:videoLike}=useQuery({
         queryKey: ["liked-video", user?.id],
            queryFn: () => VideoService.getLikeVideoUser(user.id),
            enabled: !!user?.id,
    });
    console.log(videoLike?.data)
    return (
        <div>
            <div className="flex flex-col gap-4 gap-y-10 md:hidden">
  {videoLike?.data?.map((video)=>(
                <VideoGridCard key={video.id} data={video?.videos}/>
            ))}
            </div>
            <div className="hidden flex-col gap-4 gap-y-10 md:flex w-[40rem] my-auto">
  {videoLike?.data?.map((video)=>(
                <VideoRowCard key={video.id} data={video?.videos} size="default"/>
            ))}
            </div>
          
        </div>
    )
}