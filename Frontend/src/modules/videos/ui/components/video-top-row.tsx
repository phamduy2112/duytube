import { useMemo } from "react"
import VideoMenu from "./video-menu"
import { VideoOwner } from "./video-owner"
import VideoReactions from "./video-reactions"
import { VideoDecription } from "./video-scription"
import { format, formatDistanceToNow } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"
import { RequireLoginWrapper } from "@/components/require-login"

export const VideoTopRowSkeleton=()=>{
    return (
        <div className="flex flex-col gap-4 mt-4">
            <div className="flex flex-col gap-2">
                <Skeleton className="h6 w-4/5 md:w-2/5"/>
            </div>
            <div className="flex items-center justify-between w-fulll">
                <div className="flex items-center gap-3 w-[70%]">
                    <Skeleton className="w-10 h-10 rounded-full shrink-0"/>
               
                <div className="flex flex-col gap-2 w-full">
                    <Skeleton className="h-5 w-4/5 md:2/6"/>
                    <Skeleton className="h-5 w-3/5 md:1/5"/>
                </div> 
                </div>
                <Skeleton className="h-9 w-2/6 md:1/6 rounded-full"/>

            </div>
            <Skeleton className="h-[120px] w-full mb-[1rem]"></Skeleton>
            
        </div>
    )
}

export const VideoTopRow=({video}:any)=>{
   


    let videoDetail=video?.data;
    let views=Number(video?.content?.video_views.length)
 const length = Array.isArray(videoDetail?.video_views) ? videoDetail.video_views.length : 0;

  const compactViews=useMemo(()=>{
        return Intl.NumberFormat("en",{
            notation:"compact"
        }).format(length);
           },[length])
    const expandedViews=useMemo(()=>{
        return Intl.NumberFormat("en",{
            notation:"standard"
        }).format(length)
    },[views])
    const compactDate = useMemo(() => {
  if (!videoDetail?.created_at) return '';
  return formatDistanceToNow(new Date(videoDetail.created_at), { addSuffix: true });
}, [videoDetail?.created_at]);

    
    const expandDate=useMemo(()=>{
          if (!videoDetail?.created_at) return '';

        return format(videoDetail?.created_at,"d MMM yyyy");
    },[videoDetail?.created_at])
    return (
        <div className="flex flex-col gap-4 mt-4">
            <h1 className="text-xl font-semibold">{videoDetail?.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <VideoOwner user={videoDetail?.users} videoId={videoDetail?.id}/>
                <div className="flex overflow-x-auto sm:min-w-[calc(50%-6px)] sm:justify-end sm:overflow-visible pb-2 -mb-2 sm:pb-0 sm:mb-0 gap-2">
                        <RequireLoginWrapper>
  <VideoReactions id={videoDetail?.id}/>
                        </RequireLoginWrapper>
                      
                        <VideoMenu videoId={videoDetail?.id} variant="secondary"></VideoMenu>
                </div>
            </div>
            <VideoDecription
            
            compactViews={compactViews}
            expandedViews={expandedViews}
            compactDate={compactDate}
            expandedDate={expandDate}
            description={videoDetail?.description}
            />
        </div>
    )
}