import { useMemo } from "react"
import VideoMenu from "./video-menu"
import { VideoOwner } from "./video-owner"
import VideoReactions from "./video-reactions"
import { VideoDecription } from "./video-scription"
import { format, formatDistanceToNow } from "date-fns"
import { Skeleton } from "@/components/ui/skeleton"

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
            <div className="h-[120px] w-full"></div>
            
        </div>
    )
}

export const VideoTopRow=({video})=>{
    // const compactViews=useMemo(()=>{
    //     return Intl.NumberFormat("en",{
    //         notation:"compact"
    //     }).format(1000)
    // },[])
    // const expandedViews=useMemo(()=>{
    //     return Intl.NumberFormat("en",{
    //         notation:"standard"
    //     }).format(1000)
    // },[])
    // const compactDate=useMemo(()=>{
    //     return formatDistanceToNow(video.content.create_at,{addSuffix:true});
    // },[video.content.create_at])
    
    // const expandDate=useMemo(()=>{
    //     return format(video.content.createAt,"d MMM yyyy");
    // },[video.content.create_at])

    let videoDetail=video?.content;
    console.log(videoDetail)
    return (
        <div className="flex flex-col gap-4 mt-4">
            <h1 className="text-xl font-semibold">{videoDetail?.title}</h1>
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <VideoOwner user={videoDetail?.users} videoId={videoDetail?.id}/>
                <div className="flex overflow-x-auto sm:min-w-[calc(50%-6px)] sm:justify-end sm:overflow-visible pb-2 -mb-2 sm:pb-0 sm:mb-0 gap-2">
                        <VideoReactions/>
                        <VideoMenu videoId={videoDetail?.id} variant="secondary"></VideoMenu>
                </div>
            </div>
            <VideoDecription
            compactViews={"0"}
            expandedViews={"0"}
            compactDate={"21/12/2003"}
            expandedDate={"21/12/2003"}
            description="asdasd"
            />
        </div>
    )
}