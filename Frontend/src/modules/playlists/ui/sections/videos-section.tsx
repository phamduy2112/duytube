"use client"

import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card"
import { mockVideos } from "@/scripts/seed-catelogries"
import { PlaylistsService } from "@/service/axios/playlists/playlists.service"
import { useQuery } from "@tanstack/react-query"


//  co sus
const VideosSectionSekeleton=()=>{
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
export const VideosSection=({playlistId})=>{

    const {data:playlistDetail,isLoading}=useQuery({
        queryKey:["playlist-detail",playlistId],
        queryFn:()=>PlaylistsService.getDetailPlaylists(playlistId),
        enabled:!!playlistId
    })
    if(isLoading){
        return <VideosSectionSekeleton/>
    }
    return (
        <div>
            <div className="flex flex-col gap-4 gap-y-10 md:hidden">
  {playlistDetail?.data?.playlist_videos?.map((video)=>(
                <VideoGridCard key={video.id} data={video?.videos}/>
            ))}
            </div>
            <div className="hidden flex-col gap-4 gap-y-10 md:flex">
  {playlistDetail?.data?.playlist_videos.map((video)=>(
                <VideoRowCard key={video.id} data={video?.videos} size="default"/>
            ))}
            </div>
          
        </div>
    )
}