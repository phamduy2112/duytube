'use client';

import { UserInfo } from "@/modules/user/ui/components/user-info";
import { formatDistance, formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useMemo } from "react";
import VideoMenu from "./video-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar } from "@/components/user-avatar";

interface VideoInfoProps{
    data:any[];
    onRemove?:()=>void;
}

export const VideoInfoSkeleton=()=>{
    return (
        <div className="flex gap-3">
            <Skeleton  className="size-10 flex-shrink-0 rounded-full"/>
            <div className="min-w-0 flex-1 space-x-2">
                <Skeleton className="h-5 w-[90%]"/>
                <Skeleton className="h-5 w-[70%]"/>
            </div>
        </div>
    )
}

export const VideoInfo=({data,onRemove}:VideoInfoProps)=>{
    // console.log(data)
//   const compactViews=useMemo(()=>{
//         return Intl.NumberFormat("en",{
//             notation:"compact"
//         }).format(data.viewCount);
//     },[data.viewCount])
  const compactDate=useMemo(()=>{
        return formatDistanceToNow(data?.updated_at,{addSuffix:true})
    },[data?.updated_at])
    
return (
    <div className="flex gap-3 justify-between">

     <div className="flex gap-3">
     <div>
            <UserAvatar
            imageUrl={data?.users?.avatar_url}
            name="duy"
            />
        </div>
   <div>
   <h3 className="font-medium line-clamp-1 lg:line-clamp-2 text-base break-words">
            {data?.title}
            </h3>
       <div className="min-w-0 flex-1">
    
<UserInfo name={data?.users?.channel_name}/>
    <p className="text-sm text-gray-600 line-clamp-1">
        {0} views * {compactDate}
        </p>

       </div>
   </div>
     </div>
       <div className="flex-shrink-0">
        <VideoMenu videoId={data.id}
         onRemove={onRemove}
         />
       </div>
    </div>
 

)
}