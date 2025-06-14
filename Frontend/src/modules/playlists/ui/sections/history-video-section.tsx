"use client"

import { VideoGridCard, VideoGridCardSkeleton } from "@/modules/videos/ui/components/video-grid-card"
import { VideoRowCard, VideoRowCardSkeleton } from "@/modules/videos/ui/components/video-row-card"
import { VideoService } from "@/service/axios/videos/video"
import { useUser } from "@clerk/nextjs"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"


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
export const HistoryVideosSection=({statusSubscription}:any)=>{
    const { user, isLoaded } = useUser();

    const queryClient = useQueryClient();

 
    const { mutate: deleteHistoryVideo } = useMutation({
        mutationFn: (data: { videoId: string; userId: string }) =>
          VideoService.deleteVideoHistory(data),
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['history', user!.id] });
        },
      });
      
    const handleRemove=(id:string)=>{
        const response={
            videoId:id,
            userId:user!.id
        }
        console.log(response)
        deleteHistoryVideo(response);// console.log(id)   
      }
    
    return (
        <div>
            <div className="flex flex-col gap-4 gap-y-10 md:hidden">
  {statusSubscription?.map((video:any)=>(
                <VideoGridCard key={video.id} data={video?.videos} onRemove={()=>{
                    handleRemove(video?.id)
                }}/>
            ))}
            </div>
            <div className="hidden flex-col gap-4 gap-y-10 md:flex">
  {statusSubscription?.map((video:any)=>(
                <VideoRowCard key={video.id} data={video?.videos} size="default" onRemove={handleRemove}/>
            ))}
            </div>
          
        </div>
    )
}