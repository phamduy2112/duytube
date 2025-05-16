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
  const compactViews=useMemo(()=>{
        return Intl.NumberFormat("en",{
            notation:"compact"
        }).format(data.viewCount);
    },[data.viewCount])
  const compactDate=useMemo(()=>{
        return formatDistanceToNow(data.createAt,{addSuffix:true})
    },[data.createAt])
return (
    <div className="flex gap-3 justify-between">

     <div className="flex gap-3">
     <div>
            <UserAvatar
            imageUrl="https://scontent.fsgn8-4.fna.fbcdn.net/v/t39.30808-6/496150454_3799684950248327_219587134787243704_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=JoJycapiivkQ7kNvwETfRna&_nc_oc=AdnI0UiR2vtsakP9xxDf8G3C9uGBZ4mwWjPkMnw3sLrj0J3HMUbfzdnw8hcTspUvCm8&_nc_zt=23&_nc_ht=scontent.fsgn8-4.fna&_nc_gid=U8qqeT_PN-i4Vfk50HrefA&oh=00_AfLs63s0rAOVzFrL4nSFP4M9YdjB9J81abRDTMdfCp8bKw&oe=682A3C9B"
            name="duy"
            />
        </div>
   <div>
   <Link href={`/users/${data.id}`}>
        <h3 className="font-medium line-clamp-1 lg:line-clamp-2 text-base break-words">
            {data.title}
            </h3>
            
            </Link>
       <div className="min-w-0 flex-1">
       <Link href={`/users/${data.user.id}`}>
        <UserInfo name={data.user.name}/>
        
            </Link>
    <Link href={`/videos/${data.id}`}>
    <p className="text-sm text-gray-600 line-clamp-1">
        {compactViews} views * {compactDate}
        </p></Link>
       </div>
   </div>
     </div>
       <div className="flex-shrink-0">
        <VideoMenu videoId={data.id}
        //  onRemove={onRemove}
         />
       </div>
    </div>
 

)
}