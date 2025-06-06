"use client"

import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card"
import { mockPlaylists, mockVideos } from "@/scripts/seed-catelogries"
import { PlayListGridCard } from "../components/playlist-grid-card"
import { useQuery } from "@tanstack/react-query"
import { useUser } from "@clerk/nextjs"
import { PlaylistsService } from "@/service/axios/playlists/playlists.service"


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
export const PlayListsSection=({showSkeleton}:any)=>{
    const {user}=useUser();
      const {data:playlists,isLoading}=useQuery({
        queryKey:["playlists",user?.id],
        queryFn:()=>PlaylistsService.getUserPlaylists(user!.id),
        enabled:!!user?.id
    
      })
       if (showSkeleton) {
    return <PlayListsSectionSekeleton />;
  }
 
    return (
        <div>
          {playlists?.data?.length>0 ?<></> :<>You have not playlists</>}
         <div className="gap-4 gap-y-10 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4
[@media(min-width:1920px)]:grid-cols-5 [@media(min-width:2200px)]:grid-cols-6">
                    {playlists?.data?.length>0 && playlists?.data?.map((item:any,key:number)=>(
                     <div className="">
                           <PlayListGridCard
                        key={key}
                        data={item}
                        />
                     </div>
                    ))}
            </div>
          
        </div>
    )
}